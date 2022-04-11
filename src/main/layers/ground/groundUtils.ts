export type TileList = {
  tile: number;
};
export enum EGroundType{
  node,
  path
}

const path = EGroundType.path
const node = EGroundType.node

export const squareMap =[
  [path, path, path, path, path, path, path, path, path, path],
  [path, node, node, node, node, node, node, node, node, path],
  [path, node, node, node, node, node, node, node, node, path],
  [path, node, node, node, node, node, node, node, node, path],
  [path, node, node, node, node, node, node, node, node, path],
  [path, node, node, node, node, node, node, node, node, path],
  [path, node, node, node, node, node, node, node, node, path],
  [path, node, node, node, node, node, node, node, node, path],
  [path, node, node, node, node, node, node, node, node, path],
  [path, path, path, path, path, path, path, path, path, path],
]
