
// Adagrams object is used as equivalent of a Ruby module.
const Adagrams = {
  FULLBAG: {
    'A': 9,
    'B': 2,
    'C': 2,
    'D': 4,
    'E': 12,
    'F': 2,
    'G': 3,
    'h': 2,
    'I': 9,
    'J': 1,
    'K': 1,
    'L': 4,
    'M': 2,
    'N': 6,
    'O': 8,
    'P': 2,
    'Q': 1,
    'R': 6,
    'S': 4,
    'T': 6,
    'U': 4,
    'V': 2,
    'W': 2,
    'X': 1,
    'Y': 2,
    'Z': 1
  },

  drawLetters() {
    //The Object.entries() method returns an array of a given object's own enumerable property [key, value] pairs, in the same order as that provided by a for...in loop (the difference being that a for-in loop enumerates properties in the prototype chain as well)

    //reduce ex. let sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
    //   return accumulator + currentValue;
    // }, 0);
    const bananaBag = Object.entries(Adagrams.FULLBAG).reduce((bag, [tile, count]) => {
      return bag + tile.repeat(count);
    }, '').split('');

    //picking 10 of the tiles to put into the bag to play the game with
    let bag = [];
    for(let i = 0; i < 10; i++) {
      // fancy way to choose random tile from full bananaBag
      const randomlyChosenTile = Math.floor(Math.random() * bananaBag.length);
      // pushes each of the chosen tile into the bag
      bag.push(bananaBag.splice(randomlyChosenTile, 1)[0]);
    }
    // console.log(bag);
    return bag;

  },

  usesAvailableLetters(word, drawnLetters) {
    // takes the word provided by the player and splits up the letters
    const bag = word.split('');

    // takes the first of the letters from the playing "bag" and creates a copy of it.
    const copy = drawnLetters.slice(0);

    // checks every one of the letters of the word to make sure they exist in the bag of playing tiles.
    return bag.every((square) => {
      const index = copy.indexOf(square);
      // if the word has a letter that isn't in the playing bag, it returns false.
      if (index < 0 ) return false;

      // otherwise, it deletes the copy that was made and returns true because the letter of the playing word did match the tile in the playing hand.
      delete copy[index];
      return true;
    });
  },

  SCORES: {
    'A': 1,
    'E': 1,
    'I': 1,
    'O': 1,
    'U': 1,
    'L': 1,
    'N': 1,
    'R': 1,
    'S': 1,
    'T': 1,
    'D': 2,
    'G': 2,
    'B': 3,
    'C': 3,
    'M': 3,
    'P': 3,
    'F': 4,
    'H': 4,
    'V': 4,
    'W': 4,
    'Y': 4,
    'K': 5,
    'J': 8,
    'X': 8,
    'Q': 10,
    'Z': 10,
  },

  scoreWord(word) {
    // I'm unsure why there is a return from the start?!!?

    return word.toUpperCase().split('').reduce((roundScore, letter) => {
      const scorePerTile = Adagrams.SCORES[letter];

      // if there isn't a score for a particular tile, that means it's not a valid choice and there will be an error
      if(scorePerTile === undefined) {
        throw `${letter} is a funky choice.  Not a letter!`;
      }

      // this is related to the reduce from above, adding the score of each tile to the score for the round.

      return roundScore + scorePerTile;
      // if the word is 7 or more letters long, they receive an 8-point bonus.


      // it's saying if the length of the word is less than 0, don't give a bonus.  If it's 7 or more, give the bonus.  Not sure how or why this ternary is after the function, though.  And not sure how it adds the bonus to the score.
    }, word.length < 7 ? 0 : 8);
  },

  highestScoreFrom(words) {
    // This operates on "scored words" which are { word, score } objects
    const whichWins = (optionA, optionB) => {

      // Figuring out which of the options has a larger score
      if(optionA.score > optionB.score) return optionA;
      if(optionA.score < optionB.score) return optionB;

      // If both scores are equal, and the lengths are equal, OptionA wins
      if(optionA.word.length === optionB.word.length) return optionA;

      // If one of the words used all 10 of the tiles, return that one.
      if(optionA.word.length === 10) return optionA;
      if(optionB.word.length === 10) return optionB;

      // If none of the above selectors worked, use this option to figure out which one one.
      if(optionA.word.length < optionB.word.length) return optionA;
      return optionB;
    };

    // Whichever won on the above function, return that word and the score as the winner.
    return words.map((word) => ({
      word,
      score: Adagrams.scoreWord(word),
    })).reduce(whichWins);
  }

}

export default Adagrams;

// Adagrams.drawLetters ();
