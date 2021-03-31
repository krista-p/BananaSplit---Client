import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

// NOTE: Doesn't like with .env variable
export const createUser = (email, userName, uid) => {
  console.log(email, userName);
  fetch(publicRuntimeConfig.serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, userName, uid }),
  }).then((res) => res.json())
    .then((data) => {
      // NOTE: User model from backend is returned here
      console.log(data);
    });
};
