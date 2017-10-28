

export function sortedCommentsSelector(list, criteria, order) {
  if(!list) return list;
  const ascending = order === 'ascending';
  return list.sort(function(a, b) {
    return (ascending ? a[criteria] - b[criteria] : b[criteria] - a[criteria]);
  })
}
