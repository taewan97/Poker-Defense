import { useState } from "react";
import { Ally } from "./AllyUnitS";
import { AllyType, initAlly, getNextPosition, UnitLevelMap } from "./allyUtils";
import { ReturnAllyLayer } from "../../cards/CardPedigreeView";

type Props = {};
//UnitLevelMap을 이용해서 해당 유닛의 레벨을 정한다,
//UnitLevelMap에 들어갈 값은 CardPedigreeView파일에서 받아야와 한다
export const AllyLayer = ({}: Props) => {
  const [allies, setAllies] = useState<AllyType[]>([]);

  const makeAllyUnite = () => {
    const level = ReturnAllyLayer();
    console.log("level = ", level);
    if (level !== "없다") {
      let beforePosition;
      let newPosition;
      if (allies.length === 0) {
        newPosition = { x: 0, y: 0 };
      } else {
        beforePosition = allies[allies.length - 1].position;
        newPosition = getNextPosition(beforePosition);
        console.log(newPosition);
      }
      const newAlly = initAlly(UnitLevelMap.get(level) ?? 1, newPosition);
      setAllies([...allies, newAlly]);
    }
  };

  return (
    <div className="unit_layer">
      <button className="make_unit_button" onClick={makeAllyUnite}>
        유닛 생성
      </button>
      {allies.map((ally, index) => (
        <Ally key={index} allyProps={ally} />
      ))}
    </div>
  );
};
