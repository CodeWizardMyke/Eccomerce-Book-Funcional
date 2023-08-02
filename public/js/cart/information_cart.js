//********* all requests made by api *********//
async function information_get () {
    const url = `${urlBase.api_information}/get`;
    const option ={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer: ${token}`
        }
    };
    const promisse = await fetch( url, option);
    const response = await promisse.json();

    handdlerGetInformation(promisse, response);
};information_get();

document.querySelector('#cep').addEventListener('blur', async () => {
    let cep = document.querySelector('#cep').value;
    const url = `${urlBase.api_via_cep}/${cep}/json/`
    const option = {
        method:"GET",
        mode:"cors",
        cache:"default"
    }
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    insert_result_viaCep(response);
});

async function putInformation(){
    updateErros();
    let myForm = document.querySelector('#myForm');
    let formData = new FormData(myForm);
    const url = `${urlBase.api_information}/post`;
    const option ={
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "Authorization": `Baerer: ${token}`
        },
        body: new URLSearchParams(formData).toString()
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerPutInformation(promisse, response);
};

//********* handdler response and promisses for api *********//
function handdlerGetInformation (promisse, response){
    switch (promisse.status) {
        case 200:
            if(response){DomInsert_information(response);
            }else{showButtonInsertInformation()};
        break;
        default:
            break;
    };
};

function handdlerPutInformation(promisse, response){
    switch (promisse.status) {
        case 201:
            window.alert('Dados recebidos com sucesso!')
            window.location.reload();
            break;
        case 401:
            insertErrorsResult(response)
            break;
        case 409:
            window.alert(`O usárioa já possue um cadastro de dados no sistema ou CPf já foi registrado`)
            break;
        default:
            window.alert(`Error inesperado ${promisse.status}`)
            break;
    };
};

//********* all Functions *********//
function insert_result_viaCep (result) {
    for(let index in result){
        if(document.querySelector('#'+ index)){
            document.querySelector('#' + index).value = result[index];
        };
    };
};

function DomInsert_information (data){
    let cep = document.createElement('p');
    let road = document.createElement('p');
    let complements = document.createElement('p');
    let small = document.createElement('small');
    
    small.innerText = `Endereço de Entrega`;
    cep.innerText = `CEP: ${data.cep}`;
    road.innerText = `Rua: ${data.road} | N°: ${data.number}`;
    complements.innerText = `Complemento: ${data.complements}`;
    
    let arr = [small, cep, road, complements];
    $('#addres').append(arr);
    
    document.querySelector('#addres').classList.add('p-2','border', 'select_of');
    document.querySelector('#btn_purchase').classList.remove('d-none');
};

function showButtonInsertInformation(){
    let div_addres = document.querySelector('#addres');
    let btn_add_addres = document.createElement('button');
    let p = document.createElement('p');
    
    p.innerText = 'Por favor informe seus dados pessoais e endereço de entrega para efetuar a compra!';
    btn_add_addres.id = 'btn_add_addres';
    btn_add_addres.innerText = 'Adicionar';
    btn_add_addres.type = 'button';
    
    div_addres.classList.add();
    btn_add_addres.classList.add('btn', 'btn-warning');
    
    div_addres.append(p);
    div_addres.append(btn_add_addres);
    
    btn_add_addres.addEventListener('click', openForm );
};

let arrErrorsInformation = [];
function insertErrorsResult(response, update){
    response.errors.forEach(element => {
        let string = `${element.param}`;
        document.getElementsByName(string)[0].classList.add('invalid');
        arrErrorsInformation.push(string);
    });
};

function updateErros(){
    if(arrErrorsInformation.length > 0 ){
        arrErrorsInformation.forEach( element => { document.getElementsByName(element)[0].classList.remove('invalid') });
        arrErrorsInformation = [];
    };
    document.querySelector('#form_info_addres').style = 'display: block;';
    document.querySelector('#form_info_user').style = 'display: none;';
};

//********* popUpButtonsConfig *********//
document.querySelector('#btn_close').addEventListener('click', openForm);
document.querySelector('#btn_close').addEventListener('click', closeForm);
document.querySelector('#form_info_next').addEventListener('click', nextForm);
document.querySelector('#form_info_prev').addEventListener('click', prevForm);
document.querySelector('#myForm').addEventListener('submit', event => {
    event.preventDefault();putInformation();
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