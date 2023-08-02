//api que retorna o endereço correspondente ao cep informado
document.querySelector('#cep').addEventListener('blur', async () => {
    let cep = document.querySelector('#cep').value;
    const url = `${urlBase.api_via_cep}/${cep}/json`;
    const option = {
        method:"GET",
        mode:"cors",
        cache:"default"
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerApiCep(promisse, response);
});

async function putInformation(){
    const myForm = document.querySelector('#myForm');
    const formData = new FormData(myForm);
    const url = `${urlBase.api_information}/put?_method=PUT`;
    const option ={
        method:'POST',
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "Authorization":`Baerer ${token}`,
            id:user.id_user
        },
        body: new URLSearchParams(formData).toString()
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerPutInformation(promisse, response);
};

//remover todos os dados registrados no servidor
async function deleteInformation(){
    const url = `${urlBase.api_information}/delete?_method=DELETE`;
    const option = {
        method:"POST",
        headers:{
            "Authorization":`Baerer ${token}`,
            id:user.id_user,
        },
    };
    const promisse = await fetch(url, option);
    handdlerDeleteInformation(promisse);
};

// tratamento de respostas das api 
function handdlerApiCep(promisse, response){
    switch (promisse.status) {
        case 200:
            insertDatainView(response);
            break;
        default:
            window.alert(`Error inesperado ${promisse.statuss}`);
            break;
    };
};

function handdlerPutInformation(promisse, response){
    switch (promisse.status) {
        case 200:
            window.alert('dados alterados com sucesso');
            window.location.reload();        
            break;
        case 300:
        window.alert(`${response.msg}`);  
        closeForm();
            break;
        default:
            window.alert(`Erro inesperado ${promisse.status}`);
            break;
    };
};

function handdlerDeleteInformation(promisse){
    switch (promisse.status) {
        case 200:
            window.alert('Dados removido com sucesso!');
            location.reload();
            break;
        default:
            window.alert(`Error inesperado ${promisse.status}`);
            break;
    };
};

// em resposta ao cep digitado preencha os outros campos de acordo com o endereço retornado
function insertDatainView (response) {
    for( let i in response){
        if( document.getElementById(i) ){
            document.getElementById(i).value = response[i];
        };
    };
};

//botões do formulário
document.querySelector('#put_info').addEventListener('click', openForm);
document.querySelector('#del_info').addEventListener('click', deleteInformation);

document.querySelector('#btn_close').addEventListener('click', openForm);
document.querySelector('#btn_close').addEventListener('click', closeForm);
document.querySelector('#form_info_next').addEventListener('click', nextForm);
document.querySelector('#form_info_prev').addEventListener('click', prevForm);
document.querySelector('#myForm').addEventListener('submit', event => {
    event.preventDefault();
    putInformation();
});

function nextForm(){
    document.querySelector('#form_info_addres').style = 'display: none ;';
    document.querySelector('#form_info_user').style = 'display: block ;';
};
function prevForm(){
    document.querySelector('#form_info_user').style = 'display: none ;';
    document.querySelector('#form_info_addres').style = 'display: block ;';
};
function closeForm(){
    document.querySelector('#pop_up').style = 'display: none;'
    document.querySelector('#form_info_addres').style = 'display: block;';
    document.querySelector('#form_info_user').style = 'display: none;';
};
function openForm(){
    document.querySelector('#pop_up').style = 'display: block;'
    document.querySelector('#form_info_addres').style = 'display: block;';
    document.querySelector('#form_info_user').style = 'display: none;';
};