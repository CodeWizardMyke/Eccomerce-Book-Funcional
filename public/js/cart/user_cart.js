window.addEventListener('load', () =>{
    let userToken = token;
    if(!userToken){
        location.href= '/';
    };

    async function cart_read (){
        const url = `${urlBase.api_cart}/get`;
        const option ={
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Baerer: ${userToken}`
            }
        };
        const promisse = await fetch( url, option);
        const user_cart = await promisse.json();

        handdlerFetch(promisse, user_cart, 'read');
    };

    async function cart_clean (){
        const url = `${urlBase.api_cart}/clean/?_method=delete`;
        const option ={
            method:'post',
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Baerer: ${userToken}`,
            }
        };
        const promisse = await fetch( url, option);
        const result = await promisse.json();

        handdlerFetch(promisse, result, 'clean');
    };

    function handdlerFetch (promisse, data, key){
        switch (promisse.status) {
            case 200:
                if( key == 'read'){
                    data_forEach(data);
                };
                if( key == 'clean'){
                    update();
                };
                break;
            default:
                break;
        };
    };

    function data_forEach (data) {
        if(data.length >0){
            let total_price = 0;
            data.forEach(element => {
                total_price = total_price + Number(element.request_price);
                domInsetData(element);
            });
            DomPriceBox(total_price);
            DomInsert_bt_clean_cart(data);
            btn_clean_cart_action();
        }else{
            // voce não tem items no carrinho
            cart_is_empty();
        }
    };

    function domInsetData(data){
        let div_phater = document.createElement('div');
        $("#content_cart").append(div_phater);

        let div_content = document.createElement('div');
        div_content.classList.add('col-12');
        div_content.id= 'content_box_cart';
        div_phater.appendChild(div_content);

        let div_img = document.createElement('div');
        let img = document.createElement('img');
        div_img.appendChild(img);
        div_content.appendChild(div_img);
        
        div_img.classList.add('box_img_book_cart');
        img.classList.add('img_book_cart');
        img.src = `/img-books/${data.books.front_cover}`;
        
        let div_info = document.createElement('div');
        let span_title = document.createElement('span');
        div_info.appendChild(span_title);
        div_content.appendChild(div_info);
        
        div_info.classList.add('info_cart_text');
        span_title.innerText = `Livro: ${data.books.title}`;

        let div_input = document.createElement('div');
        let form_put = document.createElement('form');
        let label = document.createElement('label');
        let input_qtd = document.createElement('input');
        let button_put = document.createElement('button');
        div_input.appendChild(form_put);
        form_put.appendChild(label);
        form_put.appendChild(input_qtd)
        form_put.appendChild(button_put);
        div_info.appendChild(div_input);
        
        label.for='input_qtd';
        label.innerText ='Und:';

        form_put.method="post";
        form_put.action=`${urlBase.api_cart}/put/${data.id_cart}/?_method=put`;
        form_put.classList.add('form_delete_cart');

        input_qtd.type = 'number';
        input_qtd.min = 1;
        input_qtd.name = 'qtd';
        input_qtd.id   = 'input_qtd';
        input_qtd.value = data.qtd_items;

        button_put.classList = "bt_put";
        button_put.type      = 'subimt';
        button_put.innerText = 'Atualizar';

        let price_tot = document.createElement('p');
        div_info.appendChild(price_tot);

        price_tot.innerText= `Formato: ${data.type_selected} | Valor Pedido: R$ ${data.request_price}`;

        let div_forms = document.createElement('div');
        let form_delete = document.createElement('form');
        let button = document.createElement('button');
        form_delete.appendChild(button);
        div_forms.appendChild(form_delete);
        div_info.appendChild(div_forms);
        
        div_forms.classList.add('div_forms');
        
        form_delete.method="post";
        form_delete.action=`${urlBase.api_cart}/delete/${data.id_cart}/?_method=delete`;
        form_delete.classList.add('form_delete_cart','text-end');

        button.classList = "bt_delete";
        button.type = 'subimt';
        button.innerText = 'Remover';
    };

    function DomInsert_bt_clean_cart (){
        let div_clean = document.createElement('div');
        let bt_clean_cart = document.createElement('a');
        div_clean.appendChild(bt_clean_cart);
        $('#items_cart').append(div_clean);

        div_clean.classList.add('div_clean');
        div_clean.id = 'btn_clean_cart';
        bt_clean_cart.classList.add('btn_clean_cart');
        bt_clean_cart.innerText = "limpar Carrinho";
    };

    function btn_clean_cart_action (){
        let btn = document.querySelector('#btn_clean_cart');
        if(btn){
            btn.addEventListener('click',()=>{
                cart_clean();
                location.reload();
            })
        }
    };

    function DomPriceBox(price){
        //active div box price
        let pay_cart = document.querySelector('#pay_cart');
        pay_cart.classList.remove('d-none');

        //insert value price
        document.querySelector('#price_cart').innerText = `R$: ${price}`;
    };

    function cart_is_empty(){
        let div = document.createElement('div');
        let p = document.createElement('p');
        let anchor = document.createElement('a');

        div.appendChild(p);
        div.appendChild(anchor);
        $('#content_cart').append(div);

        //insert data values in elements
        p.innerText = 'Você não possui nenhum livro adicionado ao carrinho.';
        anchor.innerText = 'Ir para biblioteca';
        anchor.href= urlBase.link_library;
        
        //css insert class lists
        div.style = 'height:100%;';
        div.classList.add('d-flex', 'flex-column', 'align-items-center','justify-content-center');
        anchor.classList.add('btn', 'btn-light', 'border');
    };
    
    let btn_purchase = document.querySelector('#btn_purchase');
    if(btn_purchase){
        btn_purchase.addEventListener('click', ()=>{
            location.href = urlBase.payment;
        });
    };

    const update = () =>{
       document.querySelector('#content_cart').innerHTML = "";
    };

    const startApplication = () =>{
        update();
        cart_read();
    };
    startApplication();
});