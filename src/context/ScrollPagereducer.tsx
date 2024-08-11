const defaultState = {
  page: 1,
};

const ScrollPagereducer = (state = defaultState, action) => {
  switch (action.type) {
    case "PLUS_PAGE":
      return { ...state, page: state.page + 1 };
    case "MINUS_PAGE":
      return { ...state, page: state.page - 1 };
    default:
      return state;
  }
};

export default ScrollPagereducer;

// const [posts, setPosts] = useState([]);
// const [ScrollPage, setScrollPage] = useState(1);
// const [sumOfTrashcan, setsumOfTrashcan] = useState(0);
// const [trashCanList, settrashCanList] = useState([]);
// const [orders, setOrders] = useState([]);
