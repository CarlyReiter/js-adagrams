
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

    //var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
//   return accumulator + currentValue;
// }, 0);
    const bananaBag = Object.entries(Adagrams.FULLBAG).reduce((bag, [tile, count]) => {
      return bag + tile.repeat(count);
    }, '').split('');

    let bag = [];
    for(let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * bananaBag.length);
      bag.push(bananaBag.splice(index, 1)[0]);
    }
    // console.log(bag);
    return bag;
  },

  usesAvailableLetters(word, drawnLetters) {
    const bag = word.split('');
    const copy = drawnLetters.slice(0);

    return bag.every((square) => {
      const index = copy.indexOf(square);
      if (index < 0 ) return false;

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
  }

}

// Adagrams.drawLetters ();
export default Adagrams;




//
//   scoreWord(word) {
//     return word.toUpperCase().split('').reduce((wordScore, letter) => {
//       const letterScore = Adagrams.SCORE_CHART[letter];
//       if(letterScore === undefined) {
//         throw `${letter} is not in the English alphabet!`;
//       }
//
//       return wordScore + letterScore;
//     }, word.length < 7 ? 0 : Adagrams.LENGTH_BONUS);
//   },
//
//   highestScoreFrom(words) {
//     // This operates on "scored words" which are { word, score } objects
//     const comparer = (left, right) => {
//       // Select the word with best score
//       if(left.score > right.score) return left;
//       if(left.score < right.score) return right;
//
//       // Return left if they have the same length
//       if(left.word.length === right.word.length) return left;
//
//       // Return either if they have 10 letters
//       if(left.word.length === 10) return left;
//       if(right.word.length === 10) return right;
//
//       // Return the word with the fewest letters
//       if(left.word.length < right.word.length) return left;
//       return right;
//     };
//
//     return words.map((word) => ({
//       word,
//       score: Adagrams.scoreWord(word),
//     })).reduce(comparer);
//   },
// };
