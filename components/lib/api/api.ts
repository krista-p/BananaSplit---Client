const SERVER_URL = process.env.SERVER_URL;

// NOTE: Doens't like with .env variable
export const createUser = (email, userName, uid) => {
  console.log(email, userName);
  fetch('http://localhost:4200/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, userName, uid }),
  }).then((res) => res.json())
    .then((data) => {
      // NOTE: User model from backend is returned here
      console.log(data);
    })
}
