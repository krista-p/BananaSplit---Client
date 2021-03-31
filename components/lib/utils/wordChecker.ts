interface Igrid {
  letter: string;
  id: string;
}

// depth first search to find boards recursively
const dfsBoard = (grid: (number | Igrid)[][], i: number, j: number): number => {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length || grid[i][j] === 0) {
    return 0;
  }
  // eslint-disable-next-line no-param-reassign
  grid[i][j] = 0;
  dfsBoard(grid, i + 1, j);
  dfsBoard(grid, i - 1, j);
  dfsBoard(grid, i, j + 1);
  dfsBoard(grid, i, j - 1);
  return 1;
};

// num islands problem (check how many boards there are)
export const numBoards = (matrix: (number | Igrid)[][]): number => {
  // check if grid exists first
  const grid: (number | Igrid)[][] = JSON.parse(JSON.stringify(matrix));

  if (grid === null || grid.length === 0) return 0;

  // board counter
  let boards = 0;

  // iterate thru grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== 0) boards += dfsBoard(grid, i, j);
    }
  }
  return boards;
};

// searching for the horizontal words
const dfsHorizontal = (grid: (number | Igrid)[][], i: number, j: number, start): string => {
  if (i < 0
    || i >= grid.length
    || j < 0
    || j >= grid[i].length
    || grid[i][j] === 0
  ) {
    return '';
  }
  grid[i][j] = 0;

  const right = dfsHorizontal(grid, i, j + 1, grid[i][j + 1]);
  return (start.letter + right);
};

// searching for the vertical words
const dfsVertical = (grid: (number | Igrid)[][], i: number, j: number, start): string => {
  if (i < 0
    || i >= grid.length
    || j < 0
    || j >= grid[i].length
    || grid[i][j] === 0
  ) {
    return '';
  }

  grid[i][j] = 0;
  if (grid[i + 1]) {
    const down = dfsVertical(grid, i + 1, j, grid[i + 1][j]);
    return (start.letter + down);
  }
  return start.letter;
};

// unique islands (record all of the unique islands) OBJECT FORM
export const wordFinder = (check: (number | Igrid)[][]): string[] => {
  const grid: (number | Igrid)[][] = JSON.parse(JSON.stringify(check));
  // check if grid exists first
  if (grid === null || grid.length === 0) return [];

  // store words in set
  const wordSet: Set<string> = new Set([]);
  const newGrid: (number | Igrid)[][] = JSON.parse(JSON.stringify(grid));

  // iterate thru grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== 0) {
        const horizontalWord = dfsHorizontal(grid, i, j, grid[i][j]);
        if (horizontalWord.length > 1) wordSet.add(horizontalWord.toLowerCase());
      }
      if (newGrid[i][j] !== 0) {
        const verticalWord = dfsVertical(newGrid, i, j, newGrid[i][j]);
        if (verticalWord.length > 1) wordSet.add(verticalWord.toLowerCase());
      }
    }
  }
  console.log([...wordSet].sort(), 'word finder');
  return [...wordSet].sort();
};

export const dictCheckInvalid = (words: string[], dict): string[] => {
  // const parse = JSON.parse(dict);
  const valid: string[] = [];
  const incorrect: string[] = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < dict.length; j++) {
      if (words[i] === dict[j]) {
        valid.push(words[i]);
      }
    }
    if (!valid.includes(words[i])) incorrect.push(words[i]);
  }
  return incorrect;
};

export const dictCheckValid = (words: string[], dict): string[] => {
  // const parse = JSON.parse(dict);
  const valid: string[] = [];
  const incorrect: string[] = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < dict.length; j++) {
      if (words[i] === dict[j]) {
        valid.push(words[i]);
      }
    }
    if (!valid.includes(words[i])) incorrect.push(words[i]);
  }
  return valid;
};

export const longestWordCheck = (array) => {
  array.sort((a: string, b: string) => {
    return b.length - a.length;
  });
  return array[0];
};
