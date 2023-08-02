window.addEventListener('load', ()=>{
    const urlBase = {
        api_cart:'/api/cart',
        view_cart:`/purchase/cart`
    };

    const user_token = {
        user: sessionStorage.getItem('user'),
        token: sessionStorage.getItem('token'),
    };

    let body = {
        id_books: $('#id_books').val(),
        type_selected:"kindle"
    };


    async function addItemInCart (){
        const url = `${urlBase.api_cart}/post`;
        let jBody = {
            id_books:body.id_books,
            qtd_items:document.querySelector('#qtd_request').value,
            type_selected:body.type_selected,
        };

        const option = {
            method:'POST',
            headers:{
                'Content-Types':'application/json',
                'Authorization':`Baerer ${user_token.token}`,
                "body":JSON.stringify(jBody),
            }
        };
        let promisse = await fetch( url, option );
        let res_cart = await promisse.json();
        
        handdler_fetch(promisse, res_cart);
    };

    $('#bt_cart_add_item').click( evt =>{
        evt.preventDefault();
        addItemInCart();
    });

    function handdler_fetch (promisse, data){
        switch (promisse.status) {
            case 201:
                let title = document.querySelector('#prod_title').innerText;
                msg_feedback_cart(`Livro: ${ title.split(':')[1] }. Adicionado ao carrinho!`);
                add_bt_show_cart();
                break;
            case 404:
                msg_feedback_cart('você deve estar logado para adicionar ao carrinho');
                break;
            default:
                msg_feedback_cart('Ação não autorizada pelo sistema');
                break;
        };
    };

    function msg_feedback_cart (result){
        let msg = document.createElement('p');
        msg.innerText = result;
        msg.classList.add('text-center');
        $('#feedback_cart').append(msg);
    };

    function add_bt_show_cart (){
        let link_Show_cart = document.createElement('a');
        link_Show_cart.innerText = 'Ver Meu Carrinho';
        link_Show_cart.classList.add('btn','btn-light', 'border');
        link_Show_cart.href = urlBase.view_cart;
        document.querySelector('#link_my_cart').innerHTML ="";
        $('#link_my_cart').append(link_Show_cart);
    };
    
    let kindle = Number($('.kindle').val());
    let common = Number($('.common').val());
    let special = Number($('.special').val());
    let inventory = Number($('.inventory').val());

    //verificar se esta disponível
    if(inventory == 0){
       let msg = document.createElement('span');
       msg.innerText = 'Indisponível';
       msg.classList.add('unavailable');

       document.querySelector('#estoque').appendChild(msg);
    }else{
        let msg = document.createElement('span');
        msg.innerText = 'Disponível';
        msg.classList.add('available');
 
        document.querySelector('#estoque').appendChild(msg);
    };

    const html={
        get:(element) =>{return document.querySelector(element)}
    };

    // verifique se os preços são válidos se não for desabilite o campo
    if(kindle == 0){
        html.get('#btn-kindle').classList.add('disabled');
        html.get('.k_price').classList.add('d-none');
    };

    if(common == 0){
        html.get('#btn-common').classList.add('disabled');
        html.get('.c_price').classList.add('d-none');
    };

    if(special == 0){
        html.get('#btn-special').classList.add('disabled');
        html.get('.e_price').classList.add('d-none');
    };

    //tome o valor do kindle como o padrão caso nao seja selecionado nenhum outro
    document.querySelector('.price').innerHTML = kindle;

    $('#btn-kindle').click( e =>{
        if(kindle > 0){
            document.querySelector('.price').innerHTML = kindle;
            //adicione o formato ao body que sera enviado pelo fetch
            body.type_selected = 'kindle';
        };
    });
    $('#btn-common').click( e =>{
        if(common > 0){
            document.querySelector('.price').innerHTML = common;
            //adicione o formato ao body que sera enviado pelo fetch
            body.type_selected = 'common';
        }
    });
    $('#btn-special').click( e =>{
        if(special >0){
            document.querySelector('.price').innerHTML = special;
            //adicione o formato ao body que sera enviado pelo fetch
            body.type_selected = 'special';
        };
    });

    // verificação de status do estoque do produto validação front ends
    document.querySelector('#qtd_request').addEventListener('change', () =>{
        let qtd_request = $('#qtd_request').val();
        if(qtd_request > inventory){
            document.querySelector('#qtd-feedback').innerHTML = "";
            let feedback = document.createElement('span');
            feedback.innerHTML = "a quantidade do seu pedido é maior que nossos estoques, isso pode afetar seu prazo de entrega!";
            document.querySelector('#qtd-feedback').appendChild(feedback);
        }else{
            document.querySelector('#qtd-feedback').innerHTML = "";
        };
    });
});