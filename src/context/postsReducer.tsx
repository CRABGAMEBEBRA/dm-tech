const defaultState = {
  posts: [],
};

const postsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_POSTS":
      return { ...state, posts: [...state.posts, ...action.newPosts] };
    default:
      return state;
  }
};

export default postsReducer;
