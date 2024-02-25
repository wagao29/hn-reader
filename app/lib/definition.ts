// Constants
export const ENDPOINT_URL = 'https://hacker-news.firebaseio.com/v0' as const;

export const ORIGIN_URL = 'https://news.ycombinator.com' as const;

export const PAGE_ITEM_SIZE = 18;

export const STORY_REVALIDATION_SEC = 3600;

export const ITEM_REVALIDATION_SEC = 60;

export const STORY_TYPE = ['top', 'new', 'best', 'ask', 'show', 'job'] as const;

export const ITEM_TYPE = [
  'job',
  'story',
  'comment',
  'poll',
  'pollopt',
] as const;

// Types
export type ItemId = number;

export type StoryType = (typeof STORY_TYPE)[number];

export type ItemType = (typeof ITEM_TYPE)[number];

export type Item = {
  id: ItemId;
  deleted: boolean;
  type: ItemType;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent?: ItemId;
  poll?: ItemId;
  kids: ItemId[];
  url?: string;
  score: number;
  title: string;
  parts: ItemId[];
  descendants?: number;
};
