let genre; genre ? '' :  genre = 'novel';

async function get_products_genre (gen){
    const url=`${urlBase.api_products}/get`;
    paginate.size = 12;
    const option ={
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "paginate": JSON.stringify(paginate),
            "genre":JSON.stringify(gen),
        },
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    nPages = response.nPages;

    handdlerPromisse(promisse, response);
};get_products_genre(genre);

function handdlerPromisse(promisse, response) {
    switch (promisse.status) {
        case 201:
            preload_products();
            insertResponseData(response);
            break;
        default:
            window.alert(`Erro inesperado. códigi: ${promisse.status}`);
            break;
    };
};

function preload_products(){
    document.querySelector('#preload').classList.add('d-none');
    document.querySelector('#row_products').classList.remove('d-none');
};

function insertResponseData(array){
    html.get('#row_products').innerHTML= "";
    array.content.forEach(element => {
        CreateProductsContent( element, 'row_products');
    });
};

// paginate actions buttons
document.querySelector('#previous').addEventListener('click', e =>{
    e.preventDefault();
    if( Number.parseInt(nPages) > 1 ){
        controls_paginate.previous();
        update_preload_row_and_get_products();
    };
});
document.querySelector('#next').addEventListener('click', e =>{
    e.preventDefault();
    if( Number.parseInt(nPages) > paginate.page ){
        controls_paginate.next();
        update_preload_row_and_get_products();
    };
});

function update_preload_row_and_get_products (){
    document.querySelector('#preload').classList.remove('d-none');
    document.querySelector('#row_products').classList.add('d-none');
    document.querySelector('#row_products').innerHTML = "";
    get_products_genre(genre);
};

// acionando os botoes da pagina library
function buttonsGenreLibrary(){
    html.get('#bt-novel').addEventListener('click', ()=>{
        genre = html.get('#bt-novel').value;
        paginate.page = 1;
        get_products_genre(genre);
    });
    html.get('#bt-fiction').addEventListener('click', ()=>{
        genre = html.get('#bt-fiction').value;
        paginate.page = 1;
        get_products_genre(genre);
    });
    html.get('#bt-cousebook').addEventListener('click', ()=>{
        genre = html.get('#bt-cousebook').value;
        paginate.page = 1;
        get_products_genre(genre);
    });
    html.get('#bt-storybook').addEventListener('click', ()=>{
        genre = html.get('#bt-storybook').value;
        paginate.page = 1;
        get_products_genre(genre);
    });
    html.get('#bt-terror').addEventListener('click', ()=>{
        genre = html.get('#bt-terror').value;
        paginate.page = 1;
        get_products_genre(genre);
    });
    html.get('#bt-finance').addEventListener('click', ()=>{
        genre = html.get('#bt-finance').value;
        get_products_genre(genre);
    });
    html.get('#bt-poetry').addEventListener('click', ()=>{
        genre = html.get('#bt-poetry').value;
        paginate.page = 1;
        get_products_genre(genre);
    });
    html.get('#bt-manga').addEventListener('click', ()=>{
        genre = html.get('#bt-manga').value;
        paginate.page = 1;
        get_products_genre(genre);
    });
    html.get('#bt-ligth').addEventListener('click', ()=>{
        genre = html.get('#bt-ligth').value;
        paginate.page = 1;
        get_products_genre(genre);
    });
};buttonsGenreLibrary();
