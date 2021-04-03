import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const createUser = (email, userName, uid) => {
  fetch(`${publicRuntimeConfig.serverUrl}/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, userName, uid }),
  }).then((res) => res.json())
    .then((data) => {
      // console.log(data);
    });
};
