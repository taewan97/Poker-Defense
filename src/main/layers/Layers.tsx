import { EnemyLayer } from "./enemy/EnemyLayer";
import { GroundLayer } from "./ground/GroundLayer";
import { AllyLayer } from "./ally/AllyLayer";

type Props = {};

export const Layers = ({}: Props) => {
  return (
    <div className="layers">
      <GroundLayer />
      <EnemyLayer />
      <AllyLayer />
    </div>
  );
};
