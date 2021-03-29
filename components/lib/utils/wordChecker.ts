// depth first search to find boards recursively
const dfsBoard = (grid: any[][], i: number, j: number) => {
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
export const numBoards = (matrix: any[][]): number => {
  // check if grid exists first
  const grid = JSON.parse(JSON.stringify(matrix));
  
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
const dfsHorizontal = (grid, i, j, start) => {
  if (i < 0
    || i >= grid.length
    || j < 0
    || j >= grid[i].length
    || grid[i][j] === 0
  ) {
    return '';
  }
  grid[i][j] = 0;

  const right = dfsHorizontal(grid, i, j + 1, grid[i][j+1]);
  return (start.letter + right);
};

// searching for the vertical words
const dfsVertical = (grid, i, j, start) => {
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
export const wordFinder = (check) => {
  const grid = JSON.parse(JSON.stringify(check));
  // check if grid exists first
  if (grid === null || grid.length === 0) return {};

  // store words in set
  let wordSet = new Set([]);

  // not sure if this is okay??
  // but need a copy of grid in order to get vertical words
  const newGrid = JSON.parse(JSON.stringify(grid));

  // iterate thru grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      console.log(grid[i][j])
      if (grid[i][j] !== 0) {
        let horizontalWord = dfsHorizontal(grid, i, j, grid[i][j]);
        if (horizontalWord.length > 1) wordSet.add(horizontalWord);
      }
      if (newGrid[i][j] !== 0) {
        let verticalWord = dfsVertical(newGrid, i, j, newGrid[i][j]);
        if (verticalWord.length > 1) wordSet.add(verticalWord);
      }
    }
  }
  return wordSet;
}
