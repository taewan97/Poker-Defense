import {
  CardType,
  getCardNumber,
  getCountPedigree,
  PokerPedigreeMap,
} from "./cardUtils";

type Props = {
  cardList?: CardType[];
};
let cardListSum = new Map<number[], number>();

let returnAllyLayer: string = "없다";
let link: string = "없다";

export const ReturnAllyLayer = () => {
  const retLevel = link;
  link = "없다";
  return retLevel;
};

export const ResetCardList = () => {
  link = returnAllyLayer;
  returnAllyLayer = "없다";
};

export const CardPedigreeView = ({ cardList = [] }: Props) => {
  console.log("CardPedigreeView = ", cardList);
  cardListSum = new Map<number[], number>();
  let maxPedigree = -1;
  let nn = 0;

  const updateAllyLevel = () => {
    returnAllyLayer = PokerPedigreeMap.get(cardPedigree) ?? "없다";
  };

  const retrieveCards = () => {
    if (cardList.length === 5) {
      console.log("카드리스트크기가 5");
      maxPedigree = getCountPedigree(cardList);
      console.log("maxPedigree = ", maxPedigree);
      cardListSum.set(
        cardList.map((v) => v.number).sort((a, b) => a - b),
        maxPedigree
      );
      return maxPedigree;
    }
    let leftCard = Array.from(cardList);
    //let resultArr: number[] = [];
    for (let i = 0; i < cardList.length; i++) {
      if (cardList.length === 6) {
        leftCard = cardList.filter((_, idx) => idx !== i);
        if (leftCard.length === 5) {
          nn = getCountPedigree(leftCard); //resultArr.push(getCountPedigree(leftCard));
          cardListSum.set(
            leftCard.map((v) => v.number).sort((a, b) => a - b),
            nn
          );
        }
        if (maxPedigree < nn) {
          maxPedigree = nn;
        }
        continue;
      }
      for (let j = i + 1; j < cardList.length; j++) {
        leftCard = cardList.filter((_, idx) => idx !== i && idx !== j);
        nn = getCountPedigree(leftCard); //resultArr.push(getCountPedigree(leftCard));
        cardListSum.set(
          leftCard.map((v) => v.number).sort((a, b) => a - b),
          nn
        );
        if (maxPedigree < nn) {
          maxPedigree = nn;
        }
      }
    }
    //return Math.max(...resultArr);
    return maxPedigree;
  };

  const cardPedigree = retrieveCards();
  console.log("첫 = ", cardPedigree);
  let maxCardNumber = " ";
  for (const [key, value] of cardListSum) {
    if (cardPedigree === value) {
      const tempCardNumber = getCardNumber(key);
      if (tempCardNumber > maxCardNumber) {
        maxCardNumber = tempCardNumber;
      }
    }
  }

  //유닛 소환후에 cardList를 초기화 시켜줘야 한다.
  return (
    <div>
      <div>
        족보 이름 : {maxCardNumber}
        {PokerPedigreeMap.get(cardPedigree) ?? " "}
      </div>
      {updateAllyLevel()}
    </div>
  );
};
