// Reducer qui indique si l'utilisateur est connecté ou non :
export default function (isConnected = false, action) {
  if (action.type === "connexion") {
    return true;
  } else if (action.type === "deconnexion") {
    return false;
  } else {
    return isConnected;
  }
}
