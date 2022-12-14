interface Source {
  src: string;
  width: number;
  height: number;
}

export interface Item {
  id: number;
  sources: { [key: string]: Source };
  meta: {
    color: string;
    caption: string;
    date: string;
    location: string;
  };
  category: number;
  tags: string[];
}
