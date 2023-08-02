document.getElementById('myForm').addEventListener('submit', async event => {
  event.preventDefault();
  let myForm = document.getElementById('myForm');

  const url =  `${urlBase.api_products}/post`
  const option ={
    "method":"POST",
    headers:{
      "Authorization":`Baerer ${token}`,
    },
    "body": new FormData(myForm),
  };
  const promisse = await fetch( url, option);
  const response = await promisse.json();
  
  updateErrorsInFields();
  handdlerPromisse(promisse, response);
});

function handdlerPromisse(promisse, response){
  switch (promisse.status) {
    case 201:
      sucessRegisteredProduct();
      break;
    case 401:
      errorsInFields(response);
      break;
    default:
      window.alert(`Error inesperado ${promisse.status}`);
      break;
  };
};

let arrErrors = [];

function errorsInFields(response){
  response.errors.forEach(element => {
    arrErrors.push(element);
    let input = document.querySelector('#'+element.param);
    input.classList.add('invalid');
    input.placeholder = element.msg;
    if(element.param == 'front_cover'){
      let small = document.createElement('small');
      small.innerText = element.msg;
      small.classList.add('error');
      document.querySelector('#error_front_cover').appendChild(small);
    };
  });
};

function updateErrorsInFields(){
  if(arrErrors.length > 0){
    arrErrors.forEach(element => {
      let input = document.querySelector('#'+element.param);
      input.classList.remove('invalid');
      input.placeholder = '';
      if(element.param == 'front_cover'){
        document.querySelector('#error_front_cover').innerHTML = "";
      };
    });
  };
};

function sucessRegisteredProduct(response){
  let title_msg = document.createElement('h6');
  title_msg.innerText = 'Produto cadastrado com sucesso!';
  let div = document.createElement('div');
  div.classList.add('msg-pop-up','centralize');

  div.appendChild(title_msg);
  document.querySelector('#feedbacks-msg').appendChild(div);
  setTimeout(() => {
    document.querySelector('#feedbacks-msg').innerHTML = "";
  }, 1500);
};