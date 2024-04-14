window.history.forward();
async function handleSubmit(event) {
  event.preventDefault();
  console.log("submit ran");
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  console.log(username, password);
  let userdata = [];
  const data = await fetch("users.json");
  const response = await data.json();
  userdata = response;

  console.log(userdata);

  for (let i = 0; i < userdata.length; i++) {
    if (
      username === userdata[i].username &&
      password === userdata[i].password
    ) {
      window.location.href = "/Assignment/resume.html";
    }
  }
}
