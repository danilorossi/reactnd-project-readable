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
              },
              {
                name: 'routing',
                path: 'routing'
              },
              {
                name: 'es6',
                path: 'es6'
              },
              {
                name: 'testing',
                path: 'testing'
              }
          ]
      }), MOCKED_API_DELAY)
    );

  };

}

export default CategoryApi;
