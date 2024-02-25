import { ITEM_TYPE, STORY_TYPE } from './constants';

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
