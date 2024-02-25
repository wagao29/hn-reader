import { JSDOM, VirtualConsole } from 'jsdom';
import {
  ENDPOINT_URL,
  FETCH_TIMEOUT_MS,
  ITEM_REVALIDATION_SEC,
  STORY_REVALIDATION_SEC,
} from './constants';
import { Item, ItemId, StoryType } from './types';

const virtualConsole = new VirtualConsole();

export async function fetchStories(story: StoryType): Promise<ItemId[]> {
  try {
    const option =
      story === 'new'
        ? {
            cache: 'no-cache' as RequestCache,
          }
        : {
            next: { revalidate: STORY_REVALIDATION_SEC },
          };
    const response = await fetch(
      `${ENDPOINT_URL}/${story}stories.json`,
      option,
    );
    if (!response.ok) {
      throw new Error(`[fetchStories] error status code: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchItem(itemId: ItemId): Promise<Item | undefined> {
  try {
    const response = await fetch(`${ENDPOINT_URL}/item/${itemId}.json`, {
      next: { revalidate: ITEM_REVALIDATION_SEC },
    });
    if (!response.ok) {
      throw new Error(`[fetchItem] error status code: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchOgpImageUrl(
  url: string,
): Promise<string | undefined> {
  try {
    const encodedUri = encodeURI(url);
    const headers = { 'User-Agent': 'bot' };
    const response = await fetch(encodedUri, {
      headers: headers,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) {
      throw new Error(
        `[fetchOgpImageUrl] error status code: ${response.status}`,
      );
    }
    const html = await response.text();
    const dom = new JSDOM(html, { virtualConsole });
    const meta = dom.window.document.head.querySelectorAll('meta');
    const ogp = Array.from(meta)
      .filter((element: Element) => element.hasAttribute('property'))
      .reduce((previous: any, current: Element) => {
        const property = current.getAttribute('property')?.trim();
        if (!property) return;
        const content = current.getAttribute('content');
        previous[property] = content;
        return previous;
      }, {});
    return ogp['og:image'] as string;
  } catch (error) {
    console.error(error);
  }
}
