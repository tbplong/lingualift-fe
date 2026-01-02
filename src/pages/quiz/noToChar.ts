const noToChar = (op: number) => {
  let ans: string = "";
  if (op === -1) {
    ans = " ";
  }
  if (op === 0) {
    ans = "A";
  }
  if (op === 1) {
    ans = "B";
  }
  if (op === 2) {
    ans = "C";
  }
  if (op === 3) {
    ans = "D";
  }
  return ans;
};

export default noToChar;
