import { squareMap } from "../ground/groundUtils";

export type Position = {
  x: number;
  y: number;
};

export type EnemyType = {
  hitPoint?: number;
  position: Position;
};

export const initEnemy: (hitPoint: number) => EnemyType = (
  hitPoint: number
) => {
  return {
    position: { x: 0, y: 0 },
    hitPoint,
  };
};

export const getNextPos: (pos: Position) => Position = (pos) => {
  const map = squareMap;
  if (pos.x <= 0) {
    if (pos.y === map.length - 1) return { ...pos, x: pos.x + 1 };
    return { ...pos, y: pos.y + 1 };
  }
  if (pos.y <= 0) {
    return { ...pos, x: pos.x - 1 };
  }
  if (pos.x >= map[0].length - 1) {
    return { ...pos, y: pos.y - 1 };
  }

  return { ...pos, x: pos.x + 1 };
};
