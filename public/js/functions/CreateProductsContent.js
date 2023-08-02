
/* function used to create visualization of the products of both the index page and the library */
/* ******************** */
    //1° parameter is the element of the object.
    //2° is the id of the div that will receive the created dom elements.
/* ******************** */

function CreateProductsContent (element, phater){
    let div_content = document.createElement('div');
    div_content.classList.add('col-6', 'col-sm-4', 'col-lg-3', 'col-xl-2', 'p-3');
    
    let a_link = document.createElement('a');
    a_link.href =`${urlBase.link_products}/${element.id_books}`;
    div_content.appendChild(a_link);

    let div_border = document.createElement('div');
    div_border.classList.add('border-on');
    a_link.appendChild(div_border);

    let div_img = document.createElement('div');
    div_img.classList.add('img-product');
    div_border.appendChild(div_img);

    let img = document.createElement('img');
    img.src = `/img-books/${element.front_cover}`
    div_img.appendChild(img);

    let div_content_text = document.createElement('div');
    div_content_text.classList.add('content-text');
    div_border.appendChild(div_content_text);

    let span = document.createElement('span');
    span.innerText = `${element.title}`;
    div_content_text.appendChild(span);

    let div_content_price = document.createElement('div');
    div_content_price.classList.add('content-price');
    div_content_text.appendChild(div_content_price);

    let small  = document.createElement('small');
    small.innerText = `Ofertas`
    div_content_price.appendChild(small);

    if(element.kindle_price > 0){
        let p_kindle = document.createElement('p');
        let strong = document.createElement('strong');
        strong.style = 'color:  rgba(71, 71, 71, 0.7);'
        strong.innerText = `E-book R$: ${element.kindle_price}`;

        p_kindle.appendChild(strong);
        div_content_price.appendChild(p_kindle);
    };
    if(element.common_price > 0){
        let p_common = document.createElement('p');
        let strong = document.createElement('strong');
        strong.style = 'color:  rgba(71, 71, 71, 0.7);'
        strong.innerText = `Capa Dura R$: ${element.common_price}`;

        p_common.appendChild(strong);
        div_content_price.appendChild(p_common);
    };
    if(element.special_price > 0){
        let p_special = document.createElement('p');
        let strong = document.createElement('strong');
        strong.style = 'color:  rgba(71, 71, 71, 0.7);'
        strong.innerText = `Especial R$: ${element.special_price}`;

        p_special.appendChild(strong);
        div_content_price.appendChild(p_special);
    };

    //adicione esse novo produto a esta div
    document.getElementById(phater).appendChild(div_content);
};