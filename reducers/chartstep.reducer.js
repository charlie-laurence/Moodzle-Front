// Reducer qui correspond aux steps entre les différents écrans charts :
export default function (chartstep = 1, action) {
  if (action.type === "change-step" && chartstep < 4) {
    const nextstep = action.newstep;
    return nextstep;
  } else {
    return chartstep;
  }
}
