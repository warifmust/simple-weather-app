const INITIAL_STATE = {
  forecast: [],
  weather: {}
}

const homeReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "CACHE_DATA": {
      return Object.assign({}, state, {
        weather: action.payload.weather,
        forecast: action.payload.forecast
      })
    }
    default: {
      return state
    }
  }
}

export default homeReducer
