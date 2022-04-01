export const FollowerNum = (num?: number) => {
  if (!num) {
    return "---";
  }

  return `${num}명`;
};
