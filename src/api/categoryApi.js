

import { AUTH_HEADER } from './globals';

class CategoryApi {

  static getAllCategories() {

    return new Promise((resolve, reject) => {

      fetch('/api/categories', { headers: { ...AUTH_HEADER } }) // GET the expected route
        .then(data => data.json()) // Convert result to json
        .then(jsonData => {
          resolve(jsonData);  // Resolve object
        })
        .catch(error => reject(error)); // Or reject with error
    })

  };

}

export default CategoryApi;
