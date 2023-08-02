const Dom = {
    create:(element)=>{ return document.createElement(element)}
};

function CreateProductsSearch(data){
    let div_p = document.createElement('div');
    div_p.classList.add('w-100', 'd-flex', 'h-325', 'on-325');
    document.querySelector('#search_products_painel').appendChild(div_p);

    //div contendo a imagem do produto
    let div_img = document.createElement('div');
    div_img.classList.add('h-275');
    let img = document.createElement('img');
    img.src = `/img-books/${data.front_cover}`;
    img.classList.add('prod_img');
    img.alt = `imagem-capa-${data.title}`;
    div_img.appendChild(img);
    div_p.appendChild(div_img);

    //div que contem as informacoes basicas do produto
    let div_content = Dom.create('div');
    div_content.classList.add('h-275-text');
    div_p.appendChild(div_content);

    let div_text = Dom.create('div');
    div_text.classList.add('prod-text-group');
    div_content.appendChild(div_text);

    let p1 = Dom.create('p');
    p1.innerHTML = `Livro: ${data.title}`;
    let p2 = Dom.create('p');
    p2.innerHTML = `Autor: ${data.author}`;
    let p3 = Dom.create('p');
    p3.innerHTML = `Editora: ${data.edition}`;
    let p4 = Dom.create('p');
    p4.innerHTML = `Genero: ${data.genre}`;
    let p5 = Dom.create('p');
    p5.innerHTML = `Idioma: ${data.language}`;

    let p_childs = [ p1, p2, p3, p4, p5 ];
    div_text.append(...p_childs);

    let div_box_price = Dom.create('div');
    let small_price = Dom.create('small');
    let div_price = Dom.create('div');

    let arrPrice = [];

    if(data.kindle_price > 0){
        let span_kindle = Dom.create('span');
        span_kindle.innerHTML = `Kindle: R$ ${data.kindle_price} | `;
        arrPrice.push(span_kindle);
    };
    if(data.common_price > 0){
        let span_common = Dom.create('span');
        span_common.innerHTML = `Kindle: R$ ${data.common_price} | `;
        arrPrice.push(span_common);
    };
    if(data.special_price > 0){
        let span_special = Dom.create('span');
        span_special.innerHTML = `Kindle: R$ ${data.special_price}`;
        arrPrice.push(span_special);
    };

    if(arrPrice.length >0){
        div_price.append(...arrPrice);
    };

    let div_link = Dom.create('div');
    div_link.classList.add('link-prod-search');
    let anchor = Dom.create('a');
    anchor.href = `/product/${data.id_books}`;
    anchor.classList.add('btn', 'btn-light', 'border');
    anchor.innerText = 'Ver Mais Sobre Este Produto';
    div_link.appendChild(anchor);
    div_content.appendChild(div_link);
};