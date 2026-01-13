export const getData = (key, fallback) =>
  JSON.parse(localStorage.getItem(key)) || fallback;

export const setData = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
