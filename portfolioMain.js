
// const axios = require('axios');

const name = document.getElementById("inputName")
const email = document.getElementById("inputEmail")
const subject = document.getElementById("inputSubject")
const msg = document.getElementById("inputName")



function handleSubmit(e) {
  e.preventDefault();
  const data={
    name: name.value,
    email: email.value,
    message: subject.value + msg.value,
  }

  fetch("http://localhost:3030/api/v1/email",{
    method:"POST",
    body:JSON.stringify(data),
  
  })
  .then((res) => {
    console.log('good to go')
  })
  .catch((err) => {
    console.log(err);
  });

};