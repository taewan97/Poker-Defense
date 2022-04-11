import { useEffect, useState } from "react";
import { CardType, NumberMap, SymbolMap } from "./cardUtils";

type Props = {
  card: CardType;
};

export const CardView = ({ card }: Props) => {
  const symbol = SymbolMap.get(card.symbol) ?? "";
  const numberStr = NumberMap.get(card.number) ?? "";

  return (
    <div className="card_view">
      <div className={`card_color_${card.symbol}`}>
        <div>{symbol}</div>
        <div>{numberStr}</div>
        <div>{symbol}</div>
      </div>
    </div>
  );
};
