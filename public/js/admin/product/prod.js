function locationString(){
    let query = window.location.href;
    let arr = query.split('/');
    return arr[arr.length - 1 ];
};

async function getProductById(){
    let id = locationString();
    const url = `${urlBase.api_products}/get/${id}`;
    const option = {
        "method":'GET',
        "Content-Type":"application/json",
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();
    console.log(response)

    handdlegetProductById(promisse, response);
};getProductById();

async function putProd(){
    let myForm = document.getElementById('myForm');

    const url = `${urlBase.api_products}/put/${locationString()}?_method=PUT`;
    const option = {
        method:"POST",
        headers:{
            "Authorization":`Baerer ${token}`,
        },
        body: new FormData(myForm),
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerPutProd(promisse, response);
};

async function removeProd(){
    const url = `${urlBase.api_products}/delete/${locationString()}?_method=DELETE`;
    const option ={
        method:'POST',
        headers:{
            "Authorization":`Baerer ${token}`
        }
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json()
    console.log(promisse,response)

    handdleDeleteProd(promisse, response);
};

function handdlegetProductById(promisse, response){
    switch (promisse.status) {
        case 200:
            insertProductData(response);
            break;
        default:
            alert(`Erro inesperado ${promisse.status}`);
            break;
    };
};

function handdlerPutProd(promisse, response){
    switch (promisse.status) {
        case 200:
            window.alert('atualizado com sucesso');
            document.querySelector('#myForm').classList.add('d-none');
            insertProductData(response);
            break;
        case 401:
            errorImgSelected(response);
            break;
        default:
            break;
    };
};

function handdleDeleteProd(promisse, response){
    switch (promisse.status) {
        case 202:
            alert(`Produto : ${response.status}`)
            location.reload()
            break;
        default:
            alert(`Erro inesperado: ${promisse.status}`);
            break;
    };
};

function insertProductData(response){
   html.get('#title').innerText = response.title;
   html.get('#author').innerText = response.author;
   html.get('#edition').innerText = response.edition;
   html.get('#dimensions').innerText = response.dimensions;
   html.get('#genre').innerText = response.genre;
   html.get('#publishing_company').innerText = response.publishing_company;
   html.get('#language').innerText = response.language;
   html.get('#publication_date').innerText = response.publication_date;
   html.get('#synopsis').innerText = response.synopsis;
   html.get('#number_pages').innerText = response.number_pages;
   html.get('#kindle_price').innerText = response.kindle_price;
   html.get('#common_price').innerText = response.common_price;
   html.get('#special_price').innerText = response.special_price;
   html.get('#inventory').innerText = response.inventory;
   if(response.status == 'active'){
        html.get('#status').innerText = "Disponível"
   }else{
        html.get('#status').innerText = "Indisponível"
   }

   let img = document.createElement('img');
   img.src = `/img-books/${response.front_cover}`;

   document.querySelector('#front_cover').innerHTML="";
   document.querySelector('#front_cover').appendChild(img);
};

function errorImgSelected (response){
    let divErr = document.querySelector('#error_front_cover');
    divErr.innerHTML = "";
    let small = document.createElement('small');
    small.innerText = response[0].msg;
    small.classList.add('error');
    divErr.appendChild(small);
};

document.querySelector('#for_back').addEventListener('click', ()=>{
    window.location.href = '/admin/prod/search';
});

document.querySelector('#put_prod').addEventListener('click', () => {
    document.querySelector('#myForm').classList.remove('d-none');
});

document.querySelector('#close_form').addEventListener('click', ()=>{
    document.querySelector('#myForm').classList.add('d-none');
});

document.querySelector('#myForm').addEventListener('submit', evt =>{
    evt.preventDefault();
    putProd();
});

document.querySelector('#remove_prod').addEventListener('click', ()=>{
    removeProd();
});