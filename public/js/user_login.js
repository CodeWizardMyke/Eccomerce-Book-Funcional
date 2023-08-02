//execute function onformsubmit for submit form login
document.querySelector('#form_login').addEventListener('submit', evt => {
    evt.preventDefault();
    const data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    };
    userLoginAuth(data);
});

async function userLoginAuth (data) {
    const url = `${urlBase.api_auth}/login`;
    let opt = {
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        },
    };
    const promisse = await fetch( url, opt );
    const response = await promisse.json();

    update();
    handleResponse(promisse, response);
};

const handleResponse = async (promisse, response) => {
    switch (promisse.status) {
        case 202:
            //sete data in sessionStorage
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            //redirect user
            window.location = '/';
        break;
        case 422:
            handdler_fields_empty(response);
        break;
        case 409:
            handdler_incorrect_data(response);
            break;
        default:
            alert(`Error inesperado. status ${response.status}`);
            break;
    };
};

function update (){
    document.querySelector('#err_email').innerHTML = '';
    document.querySelector('#err_password').innerHTML = '';
};

function handdler_fields_empty (response){
    response.errors.forEach(element => {
        let small_error = document.createElement('small');
        small_error.innerText = `O campo: de ${element.param}, deve ser preenchido corretamente!`;
        small_error.style = "color:red;";
        document.querySelector(`#err_${element.param}`).appendChild(small_error);
    });
};

function handdler_incorrect_data (response){
    let small_error = document.createElement('small');
    small_error.innerText = response[0].msg;
    small_error.style = "color:red;";
    document.querySelector(`#err_${response[0].param}`).appendChild(small_error);
};

function update_error(element){
    let id = `#error_${element.param} span`;
    let div_error = document.querySelector(id);
    if(div_error){
        div_error.remove();
    };
};