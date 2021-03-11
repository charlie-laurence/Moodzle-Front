// Reducer qui correspond aux activités sélectionnées par l'utilisateur :
export default function (activitySelection = [], action) {
  if (action.type === "select") {
    const filteredState = activitySelection.filter(
      (activity) => activity.name !== action.activity.name
    );
    return [...filteredState, action.activity];
  } else if (action.type === "deselect") {
    return activitySelection.filter(
      (activity) => activity.name !== action.activity.name
    );
  } else if (action.type === "reload") {
    return action.activity;
  } else if (action.type === "empty-selection") {
    return [];
  } else {
    return activitySelection;
  }
}
