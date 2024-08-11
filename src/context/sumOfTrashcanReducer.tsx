const defaultState = {
  sumOfTrashcan: 0,
};

const sumOfTrashcanreducer = (state = defaultState, action) => {
  switch (action.type) {
    case "PLUS_CAN":
      return {
        ...state,
        sumOfTrashcan: state.sumOfTrashcan + action.newsumOfTrashcan,
      };
    case "MINUS_CAN":
      return {
        ...state,
        sumOfTrashcan: state.sumOfTrashcan - action.newsumOfTrashcan,
      };
    case "NULL_CAN":
      return {
        ...state,
        sumOfTrashcan: 0,
      };
    default:
      return state;
  }
};

export default sumOfTrashcanreducer;
