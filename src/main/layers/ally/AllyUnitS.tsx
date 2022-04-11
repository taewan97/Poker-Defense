import { useState } from "react";
import { AllyType, LevelColor } from "./allyUtils";

type Props = {
  allyProps: AllyType;
};

export const Ally = ({ allyProps }: Props) => {
  const makePosition = `translate(${10 + allyProps.position.x * 80}px, ${
    10 + allyProps.position.y * 80
  }px)`;
  const allyLevel = LevelColor.get(allyProps.level);
  return (
    <div className="ally" style={{ transform: makePosition }}>
      <div className={`ally_color_${allyLevel}`}>{allyProps.level}</div>
    </div>
  );
};
