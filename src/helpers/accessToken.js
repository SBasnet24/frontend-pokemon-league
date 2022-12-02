const getAccessToken = () => {
  return localStorage.getItem("token");
};

const setAccessToken = (token) => {
  return localStorage.setItem("token", token);
};

const removeAccessToken = () => {
  localStorage.removeItem("token");
};

export { getAccessToken, setAccessToken, removeAccessToken };
