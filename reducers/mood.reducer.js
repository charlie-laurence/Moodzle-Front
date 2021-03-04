export default function (mood = 0, action) {
  if (action.type === "select-mood") {
    return action.score;
  } else {
    return mood;
  }
}
