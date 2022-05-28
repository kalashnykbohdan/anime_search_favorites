const query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      title {
        romaji
        english
        native
      }
      coverImage{
          extraLarge
          large
          medium
          color
      }
    }
  }
}
`;

const controller = new AbortController();
const signal = controller.signal;

const fetchAnimeList = (search, currentPage) => {

  const url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: {
              search: search,
              page: currentPage,
              perPage: 3
          }
        })
    };

  return fetch(url, options, {signal})
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);

}

function handleResponse(response) {
  return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
  });
}
function handleData(data) {
    return data.data.Page;
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

export default { fetchAnimeList };

















