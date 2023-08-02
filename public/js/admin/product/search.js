document.querySelector('#form_search').addEventListener('submit', e => {
    e.preventDefault();
    get_products_search();
});

 async function get_products_search(){
    const url = `${urlBase.api_products}/search`;
    const option = {
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "paginate":JSON.stringify(paginate),
            'Authorization':`Baerer ${token}`,
            "search": JSON.stringify(document.querySelector('#prod_search').value),
        },
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerPromisseResponse(promisse, response);
 };

const handdlerPromisseResponse = (promisse, response) => {
    switch (promisse.status) {
        case 200:
            document.querySelector('#noDataReturn').innerHTML = "";
            document.querySelector('#result').innerHTML = "";
            insertDataResponse(response);
            break;
        default:
            break;
    };
};

function insertDataResponse (response) {
    nPages = response.nPages;

    response.products.rows.forEach( element => {
        let row = document.createElement('tr');
        let id = document.createElement('td');
        let title = document.createElement('td');
        let link = document.createElement('td');
        let btn = document.createElement('a');

        id.innerText = element.id_books;
        title.innerText = element.title;
        btn.innerText = 'Ver';

        btn.classList.add('btn', 'btn-light');
        btn.href = `${urlBase.view_admin}/prod/${element.id_books}`;

        link.appendChild(btn);
        row.appendChild(id);
        row.appendChild(title);
        row.appendChild(link);
        document.querySelector('#result').appendChild(row);
    });
};

document.querySelector('#previous').addEventListener('click', e =>{
    e.preventDefault();
    if( Number.parseInt(nPages) > 1 ){
        controls_paginate.previous();
        update();
    };
});
document.querySelector('#next').addEventListener('click', e =>{
    e.preventDefault();
    if( Number.parseInt(nPages) > paginate.page ){
        controls_paginate.next();
        update();
    };
});

function update (){
    document.querySelector('#result').innerHTML = "";
    document.querySelector('#noDataReturn').innerHTML = "";
    get_products_search();
};