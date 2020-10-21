import axios from "axios";

// export const getAllJobs = () => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get("/api/jobs/")
//       .then((response) => {
//         resolve(response.data.data);
//       })
//       .catch(reject);
//   });
// };

export const getAllJobs = async () => {
  try {
    const res = await axios.get("/api/jobs/");
    return res.data.data;
  } catch (err) {
    return err;
  }
};

export const updateJobById = async (id, data) => {
  try {
    console.log(data);
    const res = await axios.put(`/api/jobs/${id}`, data);

    return res.data.data;
  } catch (err) {
    return err;
  }
};
