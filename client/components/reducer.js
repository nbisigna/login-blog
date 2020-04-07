export default (state, action) => {
  // console.log(action);
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, length: action.posts.length, posts: action.posts };
    case 'REMOVE_POST':
      return {
        ...state,
        length: state.length - 1,
        posts: state.posts.filter(post => post.id != action.id)
      };
    case 'SET_PAGE':
      return { ...state, page: action.page };
    case 'AUTH':
      return { ...state, user: action.user };
    case 'LOGOUT':
      localStorage.removeItem('expires');
      return { ...state, user: null };
    case 'MESSAGE':
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};
