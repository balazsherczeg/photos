export interface Position {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface LayoutCache {
  containerHeight: number;
  positions: Position[];
}
