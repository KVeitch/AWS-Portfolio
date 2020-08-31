const name = document.getElementById("inputName");
const email = document.getElementById("inputEmail");
const subject = document.getElementById("inputSubject");
const msg = document.getElementById("inputMessage");

function handleSubmit(e) {
  e.preventDefault();
  const data = {
    name: name.value,
    email: email.value,
    message: subject.value + msg.value,
  };
  console.log(data)
  fetch("http://localhost:3030/api/v1/email", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log("good to go");
      name.value = "";
      email.value="";
      subject.value="";
      msg.value="";
    })
    .catch((err) => {

      console.log(err);
    });
}
