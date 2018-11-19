
// Adagrams object is used as equivalent of a Ruby module.
const Adagrams = {
  FULLBAG: {
    'a': 9,
    'b': 2,
    'c': 2,
    'd': 4,
    'e': 12,
    'f': 2,
    'g': 3,
    'h': 2,
    'i': 9,
    'j': 1,
    'k': 1,
    'l': 4,
    'm': 2,
    'n': 6,
    'o': 8,
    'p': 2,
    'q': 1,
    'r': 6,
    's': 4,
    't': 6,
    'u': 4,
    'v': 2,
    'w': 2,
    'x': 1,
    'y': 2,
    'z': 1
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
    // unsure why the test that each item of the array is a single-letter string is failing, as when I console.log it, it appears OK
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
    'a': 1,
    'e': 1,
    'i': 1,
    'o': 1,
    'u': 1,
    'l': 1,
    'n': 1,
    'r': 1,
    's': 1,
    't': 1,
    'd': 2,
    'g': 2,
    'b': 3,
    'c': 3,
    'm': 3,
    'p': 3,
    'f': 4,
    'h': 4,
    'v': 4,
    'w': 4,
    'y': 4,
    'k': 5,
    'j': 8,
    'x': 8,
    'q': 10,
    'z': 10,
  },

  scoreWord(word) {
    // I'm unsure why there is a return from the start?!!?

    return word.toLowerCase().split('').reduce((roundScore, letter) => {
      const scorePerTile = Adagrams.SCORES[letter];

      // if there isn't a score for a particular tile, that means it's not a valid choice and there will be an error
      if(scorePerTile === undefined) {
        throw `${letter} is a funky choice.  Not a letter!`;
      }

      // this is related to the reduce from above, adding the score of each tile to the score for the round.

      return roundScore + scorePerTile;
      // if the word is 7 or more letters long, they receive an 8-point bonus.  Not sure how or why this piece is after the function, though.
    }, word.length < 7 ? 0 : 8);
  },

  highestScoreFrom(words) {
    // This operates on "scored words" which are { word, score } objects
    const comparer = (left, right) => {
      // Select the word with best score
      if(left.score > right.score) return left;
      if(left.score < right.score) return right;

      // Return left if they have the same length
      if(left.word.length === right.word.length) return left;

      // Return either if they have 10 letters
      if(left.word.length === 10) return left;
      if(right.word.length === 10) return right;

      // Return the word with the fewest letters
      if(left.word.length < right.word.length) return left;
      return right;
    };

    
    return words.map((word) => ({
      word,
      score: Adagrams.scoreWord(word),
    })).reduce(comparer);
  }

}


export default Adagrams;

// Adagrams.drawLetters ();


//
//
//
//
// };
