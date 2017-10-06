export function selectByCategory(postsStore = {}, idsForCategory = []) {
  return idsForCategory.map(id => {
    return postsStore[id];
  });
}
