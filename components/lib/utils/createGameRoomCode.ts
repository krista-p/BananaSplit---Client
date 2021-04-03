export const createGameRoomCode: Function = (len: number) => {
  let gameCode = '';
  const allowableCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charLen = allowableCharacters.length;

  for (let i = 0; i < len; i++) {
    gameCode += allowableCharacters.charAt(Math.floor(Math.random() * charLen));
  }
  return gameCode;
};
