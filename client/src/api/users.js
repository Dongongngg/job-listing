import axios from "axios";

export const signIn = async (data) => {
  try {
    const res = await axios.post("/api/users/signin/", data);

    if (res.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const signOut = async (data) => {
  localStorage.removeItem("user");
};

export const signUp = async (data) => {
  try {
    const res = await axios.post("/api/users/signup/", data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
