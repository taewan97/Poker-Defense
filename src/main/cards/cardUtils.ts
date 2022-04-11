export type CardType = {
  symbol: CardSymbol;
  number: number;
};
export type CardSymbol = "S" | "H" | "C" | "D";
export const specifyCard: (card: number) => CardType = (card: number) => {
  let symbol: CardSymbol =
    card > 38 ? "D" : card > 25 ? "C" : card > 12 ? "H" : "S";
  return { symbol: symbol, number: card % 13 };
};

export const SymbolMap = new Map<CardSymbol, string>([
  ["C", "♣"],
  ["D", "◆"],
  ["H", "♥"],
  ["S", "♠"],
]);
export const NumberMap = new Map<number, string>([
  [0, "2"],
  [1, "3"],
  [2, "4"],
  [3, "5"],
  [4, "6"],
  [5, "7"],
  [6, "8"],
  [7, "9"],
  [8, "10"],
  [9, "J"],
  [10, "Q"],
  [11, "K"],
  [12, "A"],
]);

export enum EPokerPedigree {
  top,
  onePair,
  twoPair,
  triple,
  straight,
  backStraight,
  mountain,
  flush,
  fullHouse,
  fourCard,
  straightFlush,
  backStraightFlush,
  royalStraightFlush,
}

export const PokerPedigreeMap = new Map<EPokerPedigree, string>([
  [EPokerPedigree.top, "탑"],
  [EPokerPedigree.onePair, "원페어"],
  [EPokerPedigree.twoPair, "투페어"],
  [EPokerPedigree.triple, "트리플"],
  [EPokerPedigree.straight, "스트레이트"],
  [EPokerPedigree.backStraight, "백 스트레이트"],
  [EPokerPedigree.mountain, "마운틴"],
  [EPokerPedigree.flush, "플러시"],
  [EPokerPedigree.fullHouse, "풀 하우스"],
  [EPokerPedigree.fourCard, "포카드"],
  [EPokerPedigree.straightFlush, "스트레이트 플러시"],
  [EPokerPedigree.backStraightFlush, "백 스트레이트 플러시"],
  [EPokerPedigree.royalStraightFlush, "로얄 스트레이트 플러시"],
]);

export const getCountPedigree = (cardList: CardType[]) => {
  const countMap = new Map<number, number>();

  for (const card of cardList) {
    const currentCount = countMap.get(card.number);
    if (currentCount) {
      countMap.set(card.number, currentCount + 1);
    } else {
      countMap.set(card.number, 1);
    }
  }
  const countValues = [...countMap.values()];
  const maxCount = Math.max(...countMap.values());
  if (maxCount === 4) {
    return EPokerPedigree.fourCard;
  } else if (maxCount === 3) {
    return countValues.findIndex((v) => v === 2) >= 0
      ? EPokerPedigree.fullHouse
      : EPokerPedigree.triple;
  } else if (maxCount === 2) {
    return countValues.filter((v) => v === 2).length >= 2
      ? EPokerPedigree.twoPair
      : EPokerPedigree.onePair;
  } else {
    return getStraight(cardList);
  }
};

const getStraight = (cardList: CardType[]) => {
  const colorMap = new Map<CardSymbol, number>();

  for (const card of cardList) {
    const currentCount = colorMap.get(card.symbol);
    if (currentCount) {
      colorMap.set(card.symbol, currentCount + 1);
    } else {
      colorMap.set(card.symbol, 1);
    }
  }
  const isFlush = Math.max(...colorMap.values()) === 5;

  const sortedCard = cardList.map((v) => v.number).sort((a, b) => a - b);
  console.log(sortedCard);
  const sortedCardBack = cardList
    .map((v) => (v.number + 1) % 13)
    .sort((a, b) => a - b);
  let isStraight = true;

  for (let i = 0; i < sortedCard.length - 1; i++) {
    if (sortedCard[i + 1] - sortedCard[i] > 1) {
      isStraight = false;
      break;
    }
  }

  let isBackStraight = true;
  if (sortedCardBack[0] === 0) {
    for (let i = 0; i < sortedCardBack.length - 1; i++) {
      if (sortedCardBack[i + 1] - sortedCardBack[i] > 1) {
        isBackStraight = false;
        break;
      }
    }
  } else {
    isBackStraight = false;
  }

  console.log(
    "isFlush : ",
    isFlush,
    "isBackStraight : ",
    isBackStraight,
    "isStraight : ",
    isStraight
  );
  const isMountain = isStraight && sortedCard[0] === 8;
  if (isMountain && isFlush) {
    return EPokerPedigree.royalStraightFlush;
  }
  if (isBackStraight && isFlush) {
    return EPokerPedigree.backStraightFlush;
  }
  if (isStraight && isFlush) {
    return EPokerPedigree.straightFlush;
  }
  if (isFlush) {
    return EPokerPedigree.flush;
  }
  if (isMountain) {
    return EPokerPedigree.mountain;
  }
  if (isStraight) {
    return EPokerPedigree.straight;
  }
  return EPokerPedigree.top;
};

export const getCardNumber = (maxList: number[]) => {
  const countMap = new Map<number, number>();
  let retNum: any;
  for (const num of maxList) {
    const currentCount = countMap.get(num);
    if (currentCount) {
      countMap.set(num, currentCount + 1);
    } else {
      countMap.set(num, 1);
    }
  }
  const countValues = [...countMap.values()];
  const maxCount = Math.max(...countMap.values());

  for (const i of maxList) {
    if (countMap.get(i) === maxCount) {
      retNum = NumberMap.get(i);
      countMap.delete(i);
      break;
    }
  }

  if (maxCount === 4) {
    return retNum;
  } else if (maxCount === 3) {
    if (countValues.findIndex((v) => v === 2) >= 0) {
      //풀하우스
      const maxCount = Math.max(...countMap.values());
      for (const i of maxList) {
        if (countMap.get(i) === maxCount) {
          retNum = retNum + "," + NumberMap.get(i);
          return retNum;
        }
      }
    } else {
      //트리플
      return retNum;
    }
  } else if (maxCount === 2) {
    if (countValues.filter((v) => v === 2).length >= 2) {
      //투페어
      const maxCount = Math.max(...countMap.values());
      for (const i of maxList) {
        if (countMap.get(i) === maxCount) {
          retNum = retNum + "," + NumberMap.get(i);
          return retNum;
        }
      }
    } else {
      //원페어
      return retNum;
    }
  } else {
    retNum = NumberMap.get(Math.max(...maxList));
    return retNum; //getStraight(maxList);
  }
};
