export const isValidToken = (expireOn:number):boolean => {
  const validToken = Date.now() >= (expireOn * 1000) ? false : true;
  return validToken;
}

export const verifyToken = (exp: number) => {
  return isValidToken(exp);
};

export const getToken = (setIsLogin: Function) => {
  if (localStorage.getItem('token_access')) {
    return localStorage.getItem('token_access');
  } else {
    localStorage.clear();
    setIsLogin(false);
    return;
  }
};
