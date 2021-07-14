export const COOKIE_NAME = 'FOREST_DATA_USER';

export const setCookie = (name: string, val: string) => {
  const date = new Date();
  const value = val;

  // Set it expire in 20 years
  date.setTime(date.getTime() + 7300 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie =
    name + '=' + value + '; expires=' + date.toUTCString() + '; path=/';
};

export const getCookie = (name: string) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');

  if (parts.length == 2) {
    const val = parts.pop();
    if (val) {
      return val.split(';').shift();
    }
  }
  return null;
};
