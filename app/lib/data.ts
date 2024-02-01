import { JSDOM } from 'jsdom';
import { ENDPOINT_URL, Item, ItemId, StoryType } from './definition';

export async function fetchStories(story: StoryType): Promise<ItemId[]> {
  try {
    const response = await fetch(`${ENDPOINT_URL}/${story}stories.json`);
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
    const response = await fetch(`${ENDPOINT_URL}/item/${itemId}.json`);
    if (!response.ok) {
      throw new Error(`[fetchItem] error status code: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchOgpImage(url: string): Promise<string | undefined> {
  try {
    const encodedUri = encodeURI(url);
    const headers = { 'User-Agent': 'bot' };
    const response = await fetch(encodedUri, { headers: headers });
    if (!response.ok) {
      throw new Error(`[fetchOgpImage] error status code: ${response.status}`);
    }
    const html = await response.text();
    const dom = new JSDOM(html);
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
