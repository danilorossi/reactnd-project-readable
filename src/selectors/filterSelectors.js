/** Utility to map the dropdown sort criteria selection into an actual field */
export function mapCriteriaToField(nextCriteria) {
  switch(nextCriteria) {
    case 'score': return 'voteScore';
    case 'creation_date': return 'timestamp';
    default: return 'voteScore';
  }
}
