// Reducer qui correspond aux steps entre les différents écrans mood :
export default function (step = 1, action) {
  if (action.type === "next-step" && step < 4) {
    const nextstep = step + 1;
    return nextstep;
  } else if (action.type === "previous-step" && step > 1) {
    const prevStep = step - 1;
    return prevStep;
  } else if (action.type === "update-mood") {
    return 1;
  } else if (action.type === "mood-already-entered") {
    return 4;
  } else {
    return step;
  }
}
