import { useEffect, useState } from "react";
import { Enemy } from "./EnemyUnit";
import { EnemyType, getNextPos, initEnemy } from "./enemyUtils";

type Props = {};

export const EnemyLayer = () => {
  const [enemies, setEnemies] = useState<EnemyType[]>([]);

  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [isSpawning, setIsSpawning] = useState<boolean>(false);

  useEffect(() => {
    if (isRunning) {
      const newEnemies = enemies.map((enemy) => ({
        ...enemy,
        position: getNextPos(enemy.position),
      }));
      if (enemies.length > 10) setIsSpawning(false);
      setTimeout(() => {
        setEnemies(isSpawning ? newEnemies.concat(initEnemy(100)) : newEnemies);
      }, 500);
    }
  }, [enemies, isRunning]);

  const handleClickStart = () => {
    setIsRunning(true);
    setIsSpawning(true);
  };

  const handleClickStop = () => {
    setIsRunning(false);
    setEnemies([]);
  };

  return (
    <div className="enemy_layer">
      <button onClick={handleClickStart}>스타트</button>
      <button onClick={handleClickStop}>스탑</button>
      {enemies.map((enemy, index) => (
        <Enemy key={index} enemyProps={enemy} />
      ))}
    </div>
  );
};
