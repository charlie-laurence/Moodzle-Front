//Fonction pour limiter le nombre d'activités affichées sur l'Activity Screen :
//Deux arguments : la liste d'activité et la limite
//Retourne un tableau de tableaux (pour afficher dans un scrollview horizontal 'slider')
const limitDisplayedActivities = (activityList, limitPerScreen) => {
  const listToDisplay = [];
  let nbSubArrays = 0;
  activityList.length % limitPerScreen === 0
    ? (nbSubArrays = activityList.length / limitPerScreen)
    : (nbSubArrays = Math.floor(activityList.length / limitPerScreen) + 1);
  let n = 0;
  for (let i = 0; i < nbSubArrays; i++) {
    listToDisplay.push([]);
    while (
      listToDisplay[i].length < limitPerScreen &&
      n < activityList.length
    ) {
      listToDisplay[i].push(activityList[n]);
      n++;
    }
  }
  return listToDisplay;
};

export { limitDisplayedActivities };
