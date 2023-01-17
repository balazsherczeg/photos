export interface SourceType {
  src: string;
  width: number;
  height: number;
}

export interface ItemType {
  id: string;
  sources: { [key: string]: SourceType };
  meta: {
    color: string;
    caption: string;
    date: string;
    location: string;
  };
  category: number;
  tags: string[];
}
