const initState = {
  referer: undefined,
  defaultReferer: undefined,
  isConfirmedReferer: false,
  userType: 0,
  yourCountry: 'US',
  distCenter: undefined,
}

const mlmReducer = (state = initState, action) => {
  if (action.type === 'FETCH_DEFAULT_ENROLLEE_SUCCESS') {
    return {
      ...state,
      defaultReferer: action.payload
    }
  }
  if (action.type === 'FETCH_ENROLLEE_SUCCESS') {
    return {
      ...state,
      referer: action.payload
    }
  }
  if (action.type === 'FETCH_ENROLLEE_FAILURE') {
    return {
      ...state,
      referer: undefined
    }
  }
  if (action.type === 'SET_CONFIRMED_REFERER') {
    return {
      ...state,
      isConfirmedReferer: true,
      referer: action.payload
    }
  }
  if (action.type === 'SET_USER_TYPE') {
    return {
      ...state,
      userType: action.payload,
    }
  }
  if (action.type === 'SET_COUNTRY') {
    console.log('-23')
    console.log(action.payload)
    return {
      ...state,
      yourCountry: action.payload
    }
  }
  if (action.type === 'FETCH_DISTRIBUTION_CENTER_SUCCESS') {
    return {
      ...state,
      distCenter: action.payload
    }
  }

  return state
};

export default mlmReducer
