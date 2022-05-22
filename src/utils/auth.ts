export const isValidToken = (expireOn:number):boolean => {
  const validToken = Date.now() >= (expireOn * 1000) ? false : true;
  return validToken;
}

export const verifyToken = (exp: number) => {
  return isValidToken(exp);
};

export const getToken = () => {
  return localStorage.getItem('token_acces');
};