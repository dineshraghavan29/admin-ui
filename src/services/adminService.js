// export const getMembers = () => {
//   return fetch(
//     "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
//   )
//     .then((response) => {
//       if (response.ok) {
//         return resolve(response.text());
//       }
//       return reject(Error("error"));
//     })
//     .catch((error) => {
//       return reject(Error(error.message));
//     });
// };

export const getMembers = () => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        if (response.ok) {
          return resolve(response.text());
          // return resolve("[]");
        }
        return reject(Error("error"));
      })
      .catch((error) => {
        return reject(Error(error.message));
      });
  });
};
