
const MOCK_DELAY = 3000;

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
      }), MOCK_DELAY)
    );

  };

}

export default CategoryApi;
