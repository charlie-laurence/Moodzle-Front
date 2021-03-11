// Reducer qui correspond aux modifications etc du pseudo de l'utilisateur :
export default function (pseudo = "", action) {
  if (action.type === "savePseudo") {
    return action.pseudo;
  } else if (action.type === "empty-pseudo") {
    return "";
  } 
  else if (action.type === "modify-pseudo") {
    return action.newPseudo

  }
  else {
    return pseudo;
  }
}
