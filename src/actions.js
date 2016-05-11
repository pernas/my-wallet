import fetch from 'isomorphic-fetch'

export const UNKNOWN_ACTION     = 'UNKNOWN_ACTION';

export const FETCH_FEES_REQUEST = 'FETCH_FEES_REQUEST';
export const FETCH_FEES_SUCCESS = 'FETCH_FEES_SUCCESS';
export const FETCH_FEES_FAILURE = 'FETCH_FEES_FAILURE';

export const SAVE_SCORE = 'SAVE_SCORE';
export const SAVE_SCORE_SUCCESS = 'SAVE_SCORE_SUCCESS';
export const SAVE_SCORE_FAILURE = 'SAVE_SCORE_FAILURE';

export function fetchFessSuccess(fees) {
  return {
    type: FETCH_FEES_SUCCESS,
    fees: fees,
    timestamp: Date.now()
  }
}

export function fetchFeesFailure(errorMessage) {
  return {
    type: FETCH_FEES_FAILURE,
    error: errorMessage
  }
}

// aixo es per avisar que el fetch comenca
export function fetchFeesRequest() {
  return {
    type: FETCH_FEES_REQUEST
  }
}

// aixo crea laccio asyncrona
export function fetchFees(subreddit) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(fetchFeesRequest())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch('https://api.blockchain.info/fees')
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(fetchFessSuccess(json))
      )

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}


function saveScore (score) {
  return {
    type: SAVE_SCORE,
    score
  }
}

function saveScoreSucceeded () {
  return {
    type: SAVE_SCORE_SUCCEEDED
  }
}

function saveScoreFailed (err) {
  return {
    type: SAVE_SCORE_FAILED,
    err
  }
}
