window.addEventListener('load', ()=>{
    if(user){
        document.querySelector('#user-profile').classList.remove('d-none');
        document.querySelector('#user-profile').classList.add('d-block');
    }else{
        document.querySelector('#user_not_authorized').classList.remove('d-none');
        document.querySelector('#user_not_authorized').classList.add('d-block');
    };

    async function get_cart_data (){
        let url = `${urlBase.api_cart}/get`;
        let opt = {
            method:'GET',
            headers:{
                'Content-Types':'application/json',
                'Authorization':`Bearer ${token}`
            }
        };
        let promisse = await fetch(url, opt);
        let response = await promisse.json();

        handdlerApi(promisse, response, 'cart');
    };
    async function get_purchases_data (){
        let url = `${urlBase.api_purchases}/get`;
        let opt = {
            method:'GET',
            headers:{
                'Content-Types':'application/json',
                'Authorization':`Bearer ${token}`
            }
        };
        let promisse = await fetch(url, opt);
        let response = await promisse.json();

        handdlerApi(promisse, response, 'purchases');
    };
    async function get_information_data (){
        let url = `${urlBase.api_info}/get`;
        let opt = {
            method:'GET',
            headers:{
                'Content-Types':'application/json',
                'Authorization':`Bearer ${token}`
            }
        };
        let promisse = await fetch(url, opt);
        let response = await promisse.json();

        handdlerApi(promisse, response, 'info');
    };

    function handdlerApi (promisse, response, key){
        switch (promisse.status) {
            case 200:
                if(key == 'cart'){
                    set_cart_data(response);
                };
                if(key == 'purchases'){
                    html_update('purchases');
                    set_payments_data(response);
                };
                if(key == 'info'){
                    html_update('information');
                    set_information_data(response);
                };
            break;
        };
    };
    
    //action buttons painel
    document.querySelector('#bt-cart').addEventListener('click', ()=>{
        get_cart_data();
    });
    document.querySelector('#bt-purchases').addEventListener('click', ()=>{
        get_purchases_data();
    });
    document.querySelector('#bt-information').addEventListener('click', ()=>{
        get_information_data();
    });
    document.querySelector('#bt-user').addEventListener('click', ()=>{
        html_update('user_config'); 
    });

    //adicione ao dom as informaçoes aseguir 
    function set_information_data (response){
        if(response){
            html.get('#i-name').innerText = response.full_name;
            html.get('#i-email').innerText = response.email;
            html.get('#i-tel').innerText = response.telephone;
            html.get('#i-yers').innerText = response.birth_date;
            html.get('#i-cpf').innerText = response.user_cpf;
            html.get('#i-rg').innerText = response.user_rg;
            html.get('#i-cep').innerText = response.cep;
            html.get('#i-city').innerText = response.city;
            html.get('#i-state').innerText = response.state;
            html.get('#i-district').innerText = response.district;
            html.get('#i-road-n').innerText = `${response.road} / ${response.number}`;
            html.get('#i-comp').innerText = response.complements;
        }else{
            document.querySelector('#body_info_profile').innerHTML = "";
            document.querySelector('#msg_info_profile').classList.remove('d-none');
        };
    };
    function set_cart_data (response){
        html_update('cart');

        if(response[0]){
            response.forEach(element => {
                let tr = document.createElement('tr');
                let td_id = document.createElement('td');
                let td_prod_name = document.createElement('td');
                let td_type = document.createElement('td');
                let td_price_un = document.createElement('td');
                let td_qtd_item = document.createElement('td');
                let td_last_price = document.createElement('td');
    
                td_id.innerText = element.id_cart;
                td_prod_name.innerText = element.books.title;
                td_type.innerText = element.type_selected;
                td_price_un.innerText = element.item_price;
                td_qtd_item.innerText = element.qtd_items;
                td_last_price.innerText = element.request_price;
    
                tr.append(td_id, td_prod_name, td_type, td_price_un, td_qtd_item, td_last_price);
                $("#cart_body").append(tr);
            });
        }else{
            document.querySelector('#content_cart').classList.add('d-none');
            document.querySelector('#msg_cart').classList.remove('d-none');
        };
    };
    function set_payments_data(response){
        if(response[0]){
            response.forEach(element => {
                let tr = document.createElement('tr');
                let td_id = document.createElement('td');
                let td_payment_type = document.createElement('td');
                let td_status = document.createElement('td');
                let td_price = document.createElement('td');
                let td_delivery= document.createElement('td');
    
                td_id.innerText = element.api_payment_id;
                td_payment_type.innerText = element.api_payment_type;
                td_status.innerText = element.status;
                td_price.innerText = element.price;
                td_delivery.innerText = 'undefined';
     
                tr.append(td_id, td_payment_type, td_status, td_price, td_delivery);
                $("#body_payment").append(tr);
            });
        }else{
            
            document.querySelector('#content_payment').classList.add('d-none');
            document.querySelector('#msg_payment').classList.remove('d-none');
        };
    };

    //remove a class display none e adiciona ao outros elementos
    function html_update (element){
        let div_cart = html.get('#box_cart');
        let div_info = html.get('#box_information');
        let div_purc = html.get('#box_purchases');
        let div_user_config = html.get('#form_user_config');

        switch (element) {
            case 'cart':
                document.querySelector('#cart_body').innerHTML = "";
                div_cart.classList.remove('d-none');
                div_info.classList.add('d-none');
                div_purc.classList.add('d-none');
                div_user_config.classList.add('d-none');
                break;
            case 'information':
                div_info.classList.remove('d-none');
                div_cart.classList.add('d-none');
                div_purc.classList.add('d-none');
                div_user_config.classList.add('d-none');
                break;
            case 'purchases':
                document.querySelector('#body_payment').innerHTML = "";
                div_purc.classList.remove('d-none');
                div_info.classList.add('d-none');
                div_cart.classList.add('d-none');
                div_user_config.classList.add('d-none');
            break;
            case 'user_config':
                div_purc.classList.add('d-none');
                div_info.classList.add('d-none');
                div_cart.classList.add('d-none');
                div_user_config.classList.remove('d-none');
            break;
        };
    };
});