import { GroundRow } from "./GroundRow";
import { squareMap } from "./groundUtils";

type Props = {};

export const GroundLayer = ({}: Props) => {

  const tileMap = squareMap
  console.log(tileMap)
  return (
    <div className="column ground_layer">
      {
        tileMap.map((row, index) => 
        <GroundRow key={`row_${index}`} row={row}/>)
      }
    </div>
  );
};
