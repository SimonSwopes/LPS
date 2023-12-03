export function winnings(jackpot, numMatched) {
  switch (numMatched){
    case 2:
      return (jackpot * 0.01);
    case 3:
      return (jackpot * 0.05);
    case 4:
      return (jackpot * 0.2);
    case 5:
      return jackpot;
    default:
      return 0;
  };
};
