export default function (activitySelection = [], action) {
  if (action.type === "select") {
    return [...activitySelection, action.activity];
  } else if (action.type === "deselect") {
    return activitySelection.filter(
      (activity) => activity.name !== action.activity.name
    );
  } else {
    return activitySelection;
  }
}
