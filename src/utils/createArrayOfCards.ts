export const createArrayOfCards = (size: number): number[] => {
    const totalCards = size * size;
    const arrayOfCards: number[] = [];
    for (let i = 1; i <= totalCards / 2; i++) {
        arrayOfCards.push(i, i);
    }
    arrayOfCards.sort(() => Math.random() - 0.5);
    return arrayOfCards;
};