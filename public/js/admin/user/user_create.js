document.querySelector('#myForm').addEventListener('submit', async event =>{ 
    event.preventDefault();

    let myform = document.querySelector('#myForm');
    let formData = new FormData(myform);

    const url = `${urlBase.api_users}/post`;
    const option ={
        method:'POST',
        headers:{
            "Authorization":`Baerer: ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formData).toString()
    };

    const promisse = await fetch( url, option );
    const response = await promisse.json();

    handdlerResponse(promisse, response);
});
    
const handdlerResponse = (promisse, response) => {
    switch (promisse.status) {
        case 201:
            UserCreatedSuccessful(response);
            break;
        case 406:
            ErrorsReturnded(response);
        break
        case 409:
            EmailIsExists(response);
            break;
        default:
            alert(`Error inesperado ${promisse.status}`);
            break;
    };
};

function ErrorsReturnded (response){
    response.errors.forEach( element => {
        let input = document.querySelector(`#${element.param}`);
        input.style= 'border: solid 4px red;'
        input.placeholder = 'Informe um valor válido'
    })
};

function EmailIsExists(response){
    let email = document.querySelector('#email');
    email.value = '';
    email.style= 'border: solid 2px red';
    email.placeholder = response.email;
    let re_email = document.querySelector('#re_email');
    re_email.value = '';
    re_email.style= 'border: solid 2px red';
};

function UserCreatedSuccessful(response){
    clearFields();
    let h4 = document.createElement('h4');
    h4.innerText = `Usuario cadastrado com sucesso no id: ${response.id_user}`
    h4.classList.add('sucess')
    document.querySelector('.msg').appendChild(h4);
}

function clearFields () {
    document.querySelector('#username').value ="";
    document.querySelector('#email').value ="";
    document.querySelector('#re_email').value ="";
    document.querySelector('#password').value ="";
    document.querySelector('#re_password').value ="";
};