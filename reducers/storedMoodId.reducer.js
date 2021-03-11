// Reducer qui correspond à l'id du mood enregistré ce jour (modifiable mais pas son id) :
export default function (storedMoodId = "", action) {
  if (action.type === "store-moodId") {
    return action.id;
  } else {
    return storedMoodId;
  }
}
