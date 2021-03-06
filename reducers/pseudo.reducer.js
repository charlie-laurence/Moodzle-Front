export default function (pseudo = "", action) {
  if (action.type === "savePseudo") {
    return action.pseudo;
  } else if (action.type === "empty-pseudo") {
    return "";
  } else {
    return pseudo;
  }
}
