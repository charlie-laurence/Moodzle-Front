// Reducer qui correspond au token de l'utilisateur :
export default function (token = "", action) {
  if (action.type === "addToken") {
    return action.token;
  } else if (action.type === "empty-token") {
    return "";
  } else {
    return token;
  }
}
