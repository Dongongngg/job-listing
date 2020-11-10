const Api_prefix =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_URL
    : process.env.REACT_APP_DEV_URL;

export default Api_prefix;
