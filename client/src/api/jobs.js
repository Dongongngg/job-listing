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

export const getAllJobs = () => {
  return axios
    .get("/api/jobs/")
    .then((res) => res.data.data)
    .catch((err) => err);
};
