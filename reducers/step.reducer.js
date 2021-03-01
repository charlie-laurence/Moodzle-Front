export default function (step = 1, action) {
  if (action.type === "next-step" && step < 4) {
    const nextstep = step + 1;
    return nextstep;
  } else if (action.type === "previous-step" && step > 1) {
    const prevStep = step - 1;
    return prevStep;
  } else if (action.type === "update-mood") {
    return 1;
  } else {
    return step;
  }
}
