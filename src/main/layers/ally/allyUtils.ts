import { squareMap } from "../ground/groundUtils";

export type Position = {
  x: number;
  y: number;
};

export type AllyType = {
  level: number;
  position: Position;
};

export const initAlly: (level: number, position: Position) => AllyType = (
  level: number,
  position: Position
) => {
  return {
    level,
    position,
  };
};

export const getNextPosition: (position: Position) => Position = (position) => {
  const map = squareMap;
  if (position.x <= 0) {
    if (position.y === map.length - 3)
      return { ...position, x: position.x + 1 };
    return { ...position, y: position.y + 1 };
  }
  if (position.y <= 0) {
    return { ...position, x: position.x - 1 };
  }
  if (position.x >= map[1].length - 3) {
    return { ...position, y: position.y - 1 };
  }

  return { ...position, x: position.x + 1 };
};

export const UnitLevelMap = new Map<string, number>([
  ["없다", 0],
  ["탑", 1],
  ["원페어", 2],
  ["투페어", 3],
  ["트리플", 4],
  ["스트레이트", 5],
  ["백 스트레이트", 6],
  ["마운틴", 7],
  ["플러시", 8],
  ["풀 하우스", 9],
  ["포카드", 10],
  ["스트레이트 플러시", 11],
  ["백 스트레이트 플러시", 12],
  ["로얄 스트레이트 플러시", 13],
]);

export const LevelColor = new Map<number, string>([
  [1, "aqua"],
  [2, "black"],
  [3, "blue"],
  [4, "fuchsia"],
  [5, "gray"],
  [6, "green"],
  [7, "lime"],
  [8, "maroon"],
  [9, "navy"],
  [10, "olive"],
  [11, "purple"],
  [12, "red"],
  [13, "silver"],
]);
