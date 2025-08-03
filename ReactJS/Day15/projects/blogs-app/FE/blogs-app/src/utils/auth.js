import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('accessToken');
export const getRefreshToken = () => Cookies.get('refreshToken');

export const setTokens = (accessToken, refreshToken) => {
  Cookies.set('accessToken', accessToken, { expires: 1 / 96 }); // 15 minutes
  Cookies.set('refreshToken', refreshToken, { expires: 7 }); // 7 days
};

export const clearAuthTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const logout = () => {
  clearAuthTokens();
  window.location.href = '/login';
};
