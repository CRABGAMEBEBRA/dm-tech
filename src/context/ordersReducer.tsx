import { random, round } from "mathjs";

const defaultState = {
  orders: [],
};

const ordersReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [
          ...state.orders,
          {
            id: round(random(1000000, 2000000)),
            images: [
              action.trashCanList.map(
                (trashCanListElement) => trashCanListElement.image
              ),
            ],
            data: new Date().toISOString().slice(0, 10),
            orderSum: action.sumOfTrashcan,
          },
        ],
      };
    default:
      return state;
  }
};

export default ordersReducer;
