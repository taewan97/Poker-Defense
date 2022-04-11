import { NodeTile } from "./NodeTile";
import { PathTile } from "./PathTile";
import { EGroundType } from "./groundUtils";
type Props = {
  row: number[];
  rowIndex?: number;
};

export const GroundRow = ({ row, rowIndex }: Props) => {
  console.log("tile_" + rowIndex + row);
  return (
    <div className="row">
      {row.map((tile, index) =>
        tile === EGroundType.path ? (
          <PathTile key={`tile_${rowIndex}_${index}`} />
        ) : (
          <NodeTile key={`tile_${rowIndex}_${index}`} />
        )
      )}
    </div>
  );
};
