export default function (token = "", action) {
  if (action.type === "addToken") {
    return action.token;
  } else if (action.type === "empty-token") {
    return "";
  } else {
    return token;
  }
}
