import Properties from "../utils/Properties";

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => {
        if (response.ok) {
          return resolve(response.text());
        }
        return reject(Properties.get_users_error);
      })
      .catch((error) => {
        return reject(error.message);
      });
  });
};
