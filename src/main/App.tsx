import { CardZone } from "./cards/CardZone";
import { EnemyLayer } from "./layers/enemy/EnemyLayer";
import { GroundLayer } from "./layers/ground/GroundLayer";
import { Layers } from "./layers/Layers";

function App() {
  return (
    <div>
      <Layers />
      <CardZone />
    </div>
  );
}

export default App;
