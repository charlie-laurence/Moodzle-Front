export default function (storedMoodId = "", action) {
  if (action.type === "store-moodId") {
    return action.id;
  } else {
    return storedMoodId;
  }
}
