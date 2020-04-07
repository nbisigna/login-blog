export default async dispatch => {
  try {
    const req = await fetch('/users/auth', {
      method: 'post'
    });
    const res = await req.json();
    // console.log(res);
    if (res.msg == 'Token is not valid') {
      await localStorage.removeItem('expires');
      return;
    } else if (res.msg == 'No token, authorization denied') {
      await localStorage.removeItem('expires');
      dispatch({ type: 'AUTH', user: null });
      return;
    }
    if (res.user) {
      dispatch({ type: 'AUTH', user: res.user });
    }
  } catch (error) {
    // console.error(error.message);
  }
};
