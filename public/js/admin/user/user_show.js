function locationString(){
    let query = window.location.href;
    let arr = query.split('/')
    return arr[arr.length - 1 ];
}

async function getUserById(){
    const url = `${urlBase.api_users}/get/${locationString()}`
    const option ={
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Baerer ${token}`
        },
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    let {info, user } = response;
    if(info != null){
        html.get('#login').innerHTML = ` <strong>Email Login</strong>: ${user.email}`;
        html.get('#full_name').innerHTML = `<strong>Nome completo</strong>: ${info.full_name}`;
        html.get('#email').innerHTML = `<strong>Email contato</strong>: ${info.email}`;
        html.get('#telephone').innerHTML =`<strong>Telefone contato</strong>: ${info.telephone}`;
        html.get('#user_cpf').innerHTML = `<strong>CPF do usuário</strong>: ${info.user_cpf}`;
        html.get('#city').innerHTML = `<strong>Cidade</strong>: ${info.city}`;
        html.get('#state').innerHTML = `<strong>Estado</strong>: ${info.state}`;
        html.get("#cep").innerHTML = `<strong>Cep</strong>: ${info.cep}`;
        html.get('#road').innerHTML = `<strong>Rua</strong>: ${info.road}/ N° ${info.number}`;
        html.get('#complements').innerHTML = `<strong>Complementos</strong>: ${info.complements}`;

    }else{
        html.get('#login').innerHTML = ` <strong>Email Login</strong>: ${user.email}`;
        html.get('#full_name').innerHTML = `<strong>Nome completo</strong>: ${user.username}`;
        html.get('#email').innerHTML = `<strong>Authorização</strong>: ${user.admin}`;
    }

    html.get('#login').innerHTML = ` <strong>Email Login</strong>: ${user.email}`;

    let img = document.createElement('img');
    img.src = `/images/users/${user.user_avatar}`;
    img.classList.add('img-avatar');
    document.querySelector('.img_avatar').appendChild(img);
}getUserById();

async function sendPutUser(){
    const myForm = document.getElementById('myForm')
    const url = `${urlBase.api_users}/put/${locationString()}?_method=PUT`;
    let option ={
        "method":"POST",
        headers:{
          "Authorization":`Baerer ${token}`,
        },
        "body": new FormData(myForm),
      };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerPutUser(promisse, response);
};

async function deleteUser(){
    const url = `${urlBase.api_users}/delete/${locationString()}?_method=DELETE`;
    let option ={
        "method":"POST",
        headers:{
          "Authorization":`Baerer ${token}`,
        },
      };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerDeleteUser(promisse, response);
};

function handdlerPutUser(promisse, response){
    switch (promisse.status) {
        case 200:
            window.alert('atualizado com sucesso!')
            window.location.reload()
            break;
        default:
            alert(`Erro inesperado ${promisse.status}`)
            break;
    }
}
function handdlerDeleteUser(promisse, response){
    switch (promisse.status) {
        case 200:
            window.alert('Deleteado com sucesso!')
            window.location.href = '/admin/user/search'
            break;
        default:
            alert(`Erro inesperado ${promisse.status}`)
            break;
    }
}

function insertData(data){
   
};

document.querySelector('#put_user').addEventListener('click', e => {
    html.get('#myForm').classList.remove('d-none');
} );
document.querySelector('#close_put').addEventListener('click', e => {
    html.get('#myForm').classList.add('d-none');
} );
document.querySelector('#myForm').addEventListener('submit', e =>{
    e.preventDefault();
    sendPutUser();
} );
document.querySelector('#delete_user').addEventListener('click', e =>{
    deleteUser();
})