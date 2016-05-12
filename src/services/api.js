import 'isomorphic-fetch'

const API_ROOT = 'https://api.blockchain.info/'

function callApi(endpoint) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json;
    })
    .then(
      response => ({response}),
      error => ({error: error.message || 'Something bad happened'})
    )
}

// api services
export const fetchFees = login => callApi('fees/')
// export const fetchFees = login => callApi(`users/${login}`, userSchema)
// export const fetchRepo = fullName => callApi(`repos/${fullName}`, repoSchema)
// export const fetchStarred = url => callApi(url, repoSchemaArray)
// export const fetchStargazers = url => callApi(url, userSchemaArray)
