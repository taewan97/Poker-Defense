import { useState } from "react";
import { EnemyType } from "./enemyUtils";

type Props = {
  enemyProps: EnemyType;
};

export const Enemy = ({ enemyProps }: Props) => {
  const makePosition = `translate(${25 + enemyProps.position.x * 80}px, ${
    enemyProps.position.y * 80
  }px)`;
  return <div className="enemy" style={{ transform: makePosition }} />;
};
