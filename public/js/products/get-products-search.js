window.addEventListener('load', ()=>{
    function getQuery(){
        let query = window.location.href;
        let arr = query.split('=')
        return arr[arr.length - 1 ];
    };

    async function get_products_search (){
        paginate.size = 6
        const url = `${urlBase.api_products}/search`;
        const option = {
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "paginate": JSON.stringify(paginate),
                "search": JSON.stringify(getQuery()),
            },
        };
        const promisse = await fetch(url, option);
        const response = await promisse.json();
        
        hanndlerPromisse(promisse, response);
    };get_products_search();

    function hanndlerPromisse(promisse, response){
        switch (promisse.status) {
            case 200:
                nPages = response.nPages;
                response.products.rows.forEach(element => {
                    CreateProductsSearch(element);
                });
                break;
            default:
                let notFound = document.querySelector('.notfound');
                notFound.classList.remove('d-none');
                break;
        };
    };

    const Dom = {
        create:(element)=>{ return document.createElement(element)}
    };

    document.querySelector('#previous').addEventListener('click', e =>{
        e.preventDefault();
        if( nPages > 1 ){
            controls_paginate.previous();
            update();
        };
    });
    document.querySelector('#next').addEventListener('click', e =>{
        e.preventDefault();
        if( nPages > paginate.page ){
            controls_paginate.next();
            update();
        };
    });

    function update (){
        document.querySelector('#search_products_painel').innerHTML = "";
        get_products_search();
    };
});