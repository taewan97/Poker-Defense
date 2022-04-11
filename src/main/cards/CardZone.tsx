import { useEffect, useState } from "react";
import { CardPedigreeView, ResetCardList } from "./CardPedigreeView";
import { CardType, specifyCard, NumberMap, SymbolMap } from "./cardUtils";

type Props = {};
let cardSet = new Set<number>();
export const CardZone = ({}: Props) => {
  const [cardList, setCardList] = useState<CardType[]>([]);
  const [coin, setCoin] = useState<number>(2000);

  const getRandomCard = () => {
    return Math.floor(Math.random() * 52) % 52;
  };

  const drawCard = (count: number) => () => {
    cardSet.clear();
    if (count === 5) {
      setCoin(coin - 100);
    } else if (count === 6) {
      setCoin(coin - 200);
    } else {
      setCoin(coin - 300);
    }

    for (let i = 0; i < count; i++) {
      const newCard = getRandomCard();
      if (!cardSet.has(newCard)) {
        cardSet.add(newCard);
      } else {
        i--;
      }
    }
    setCardList([...cardSet.values()].map((card) => specifyCard(card)));
  };

  const cardView = (card: CardType, index: number) => {
    const symbol = SymbolMap.get(card.symbol) ?? "";
    const numberStr = NumberMap.get(card.number) ?? "";

    const changeCard = () => {
      console.log("index = ", index);
      const deleteCardIndex = cardList.indexOf(card);
      cardList.splice(deleteCardIndex, 1);

      const arrCardSet = Array.from(cardSet);
      arrCardSet.splice(index, 1);

      const cardSetTemp = new Set(arrCardSet);

      let changeCardNumber = 0;

      for (let i = 0; i < 1; i++) {
        changeCardNumber = getRandomCard();
        if (!cardSetTemp.has(changeCardNumber)) {
          arrCardSet.splice(index, 0, changeCardNumber);
          cardSetTemp.add(changeCardNumber);
        } else {
          i--;
        }
      }

      const newCardSet = new Set(arrCardSet);
      cardSet = newCardSet;
      cardList.splice(index, 0, specifyCard(changeCardNumber));
      setCardList([...cardList]);
    };
    return (
      <button onClick={changeCard} className="card_view">
        <div className={`card_color_${card.symbol}`}>
          <div>{symbol}</div>
          <div>{numberStr}</div>
          <div>{symbol}</div>
        </div>
      </button>
    );
  };

  const resetCardList = (num: number) => () => {
    ResetCardList();
    setCardList([]);
  };

  return (
    <div className="card_zone">
      <div>카드 존</div>
      <button onClick={drawCard(5)}>5장 드로우(100원)</button>
      <button onClick={drawCard(6)}>6장 드로우(200원)</button>
      <button onClick={drawCard(7)}>7장 드로우(300원)</button>
      <div className="row">
        {cardList.map((card, index) => (
          <div key={index}>{cardView(card, index)}</div>
        ))}
      </div>
      <div>
        <CardPedigreeView cardList={cardList} />
      </div>
      <button onClick={resetCardList(1)}> 결정 </button>

      <div className="coin">Coin : {coin}</div>
    </div>
  );
};
