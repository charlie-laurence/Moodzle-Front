export default function (chartstep = 1, action) {
  if (action.type === "next-step" && chartstep < 4) {
    const nextstep = chartstep + 1;
    return nextstep;
  } else if (action.type === "previous-step" && chartstep > 1) {
    const prevStep = chartstep - 1;
    return prevStep;
  } else if (action.type === "update-mood") {
    return 1;
  } else {
    return chartstep;
  }
}
