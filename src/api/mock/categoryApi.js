import { MOCKED_API_DELAY } from './delay';

class CategoryApi {

  static getAllCategories() {

    return new Promise((resolve, reject) => setTimeout(
        () => resolve({
          categories: [
              {
                name: 'react',
                path: 'react'
              },
              {
                name: 'redux',
                path: 'redux'
              },
              {
                name: 'udacity',
                path: 'udacity'
              }
          ]
      }), MOCKED_API_DELAY)
    );

  };

}

export default CategoryApi;
