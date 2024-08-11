const defaultState = {
  trashCanList: [],
};

const trashCanListreducer = (state = defaultState, action) => {
  switch (action.type) {
    case "PLUS_ITEM":
      return {
        ...state,
        trashCanList: state.trashCanList.map((trashCanListElement) => {
          if (Number(trashCanListElement.index) != Number(action.post.id)) {
            return trashCanListElement;
          } else {
            return {
              index: action.post.id,
              title: action.post.title,
              image: action.post.picture,
              quantity: action.productsQuantity + 1,
              price: action.post.price,
            };
          }
        }),
      };
    case "MINUS_ITEM":
      return {
        ...state,
        trashCanList: state.trashCanList.map((trashCanListElement) => {
          if (Number(trashCanListElement.index) != Number(action.post.id)) {
            return trashCanListElement;
          } else {
            return {
              index: action.post.id,
              title: action.post.title,
              image: action.post.picture,
              quantity: action.productsQuantity - 1,
              price: action.post.price,
            };
          }
        }),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        trashCanList: state.trashCanList.filter(
          (trashCanListElement) =>
            Number(trashCanListElement.index) != Number(action.post.id)
        ),
      };
    case "ADD_ITEMS":
      return {
        ...state,
        trashCanList: [
          ...state.trashCanList,
          {
            index: action.post.id,
            title: action.post.title,
            image: action.post.picture,
            quantity: 1,
            price: action.post.price,
          },
        ],
      };
    case "NULL_ITEMS":
      return {
        ...state,
        trashCanList: [],
      };
    default:
      return state;
  }
};

export default trashCanListreducer;
