window.addEventListener('load', e =>{
    async function get_products (){
        const url=`${urlBase.api_products}/bestsaler`;
        let option ={
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "paginate":JSON.stringify(paginate),
            },
        };
        const promisse = await fetch(url, option);
        const response = await promisse.json();
    
        handdlerPromise(promisse, response);
    };get_products();
    
    function handdlerPromise(promisse, response){
    switch (promisse.status) {
        case 200:
            nPages = response.nPages;
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
        array.content.forEach( async (element)  => {
            CreateProductsContent(element.books, 'row_products');
        });
    };
    
    // paginate actions buttons
    document.querySelector('#previous').addEventListener('click', e =>{
        e.preventDefault();
        if( Number.parseInt(nPages) > 1 ){
            controls_paginate.previous();
            update_products();
            get_products();
        }
    });
    document.querySelector('#next').addEventListener('click', e =>{
        e.preventDefault();
        if( Number.parseInt(nPages) > paginate.page ){
            controls_paginate.next();
            update_products();
            get_products();
        };
    });
    
    function update_products (){
        document.querySelector('#preload').classList.remove('d-none');
        document.querySelector('#row_products').classList.add('d-none');
        document.querySelector('#row_products').innerHTML = "";
    };
});