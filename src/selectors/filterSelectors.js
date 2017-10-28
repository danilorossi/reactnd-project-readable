export function mapCriteriaToField(nextCriteria) {
  switch(nextCriteria) {
    case 'score': return 'voteScore';
    case 'creation_date': return 'timestamp';
  }
}
