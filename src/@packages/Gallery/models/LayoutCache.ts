export interface SizeType {
  height: number;
  width: number;
}

export interface PositionType extends SizeType {
  left: number;
  top: number;
}

export interface LayoutCache {
  containerHeight: number;
  positions: PositionType[];
}
