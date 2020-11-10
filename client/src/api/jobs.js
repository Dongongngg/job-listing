import axios from "axios";
import authHeader from "./authHeader";
import Api_prefix from "./url";

export const getAllJobs = async () => {
  try {
    const res = await axios.get(Api_prefix + "/api/jobs/", {
      headers: authHeader(),
    });
    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return "error";
    }
  } catch (err) {
    return err.response.data;
  }
};

export const updateJobById = async (id, data) => {
  try {
    const res = await axios.put(Api_prefix + `/api/jobs/${id}`, data, {
      headers: authHeader(),
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const addJob = async (data) => {
  try {
    const res = await axios.post(Api_prefix + "/api/jobs/", data, {
      headers: authHeader(),
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteJobById = async (id) => {
  try {
    const res = await axios.delete(Api_prefix + `/api/jobs/${id}`, {
      headers: authHeader(),
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
