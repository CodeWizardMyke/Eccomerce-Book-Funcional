const urlBase = {
    api_via_cep:'https://viacep.com.br/ws',
    api_auth:'/auth',
    api_cart:'/api/cart',
    api_info:'/api/info',
    api_feedback:'/api/feedback',
    api_users:'/api/users',
    api_information:'/api/info',
    api_products:'/api/products',
    api_purchases:'/api/purchases',
    link_add_info:"/user/profile/information",
    link_library:'/products/library',
    link_products:'/product',
    views_user:'/user',
    view_admin:'/admin',
    user_avatar:'/images/users',
    payment:'/purchase/payment',
    api_mercado_pago:'/api/mp'
};

const html = { get:(element)=>{ return document.querySelector(element)}, };
const user = JSON.parse(sessionStorage.getItem('user'));
const token = sessionStorage.getItem('token');

function userFirstAndMiddleName (){
    if(user){
        let firstName = user.username.split(" ")[0];
        let secondName = user.username.split(" ")[1];
        let nick = firstName;
        if(secondName){
            nick = firstName+' '+secondName; 
        };
        return nick;
    };
};

window.addEventListener('load', ()=>{
    if(user){
        document.querySelector('#cart_link-1').classList.remove('d-none');
        document.querySelector('#cart_link-2').classList.remove('d-none');
    };

    if( user == undefined){
        logedOutUser();
    }else{
        logedInUser();
    };

    function logedOutUser(){
        let bt_login = document.createElement('a');
        let bt_sign = document.createElement('a');
        bt_login.href = `${urlBase.api_auth}/login`;
        bt_login.innerText = 'Login';
        bt_login.classList.add('btn','btn-outline-light','me-2');

        bt_sign.href = `${urlBase.api_auth}/sign`;
        bt_sign.innerText = 'Sign-up';
        bt_sign.classList.add('btn','btn-warning');

        document.querySelector('#bt-user-off').classList.remove('d-none');
        document.querySelector('#painel-user-on').classList.add('d-none');
        document.querySelector('#bt-user-off').appendChild(bt_login);
        document.querySelector('#bt-user-off').appendChild(bt_sign);
    };
    
    function logedInUser(){
        document.querySelector('#bt-user-off').classList.add('d-none');
        document.querySelector('#painel-user-on').classList.remove('d-none');
        insertInPageNick();
        btnLogedInUser();
    };

    function insertInPageNick () {
        let insertInPageNick = document.createElement('small');
        insertInPageNick.innerText =  userFirstAndMiddleName();
        document.querySelector('#user_name').appendChild(insertInPageNick);
    };

    function btnLogedInUser () {
        const div = document.createElement('div');
        const btn_perfil =document.createElement('a');
        
        if(user.admin == 'true'){
            btn_perfil.href = `${urlBase.view_admin}/`;
        } else {
            btn_perfil.href = `${urlBase.views_user}/profile`;
        };

        btn_perfil.classList.add('btn');
        btn_perfil.id = 'bt-profile';
        btn_perfil.innerText = "Perfil";
        div.appendChild(btn_perfil);
        
        const div2 = document.createElement('div');
        const btn_logout =document.createElement('div');

        btn_logout.classList.add('btn');
        btn_logout.id = "bt-user-logout";
        btn_logout.innerText = 'sair';
        div2.appendChild(btn_logout);

        document.querySelector('#btn_user_on').appendChild(div);
        document.querySelector('#btn_user_on').appendChild(div2);

        // execute function insert avatar user
        insertAvatarUser();
    };
    
    function insertAvatarUser () {
        const link_perfil = document.createElement('a');
        const user_avatar = document.createElement('img');
        
        link_perfil.href = `${urlBase.views_user}/profile`;
        link_perfil.id = 'avatar_link_perfil'
        document.querySelector('#avatar_user').appendChild(link_perfil);

        user_avatar.src = `/images/users/${user.user_avatar}`;
        user_avatar.alt = `dh_avatar_user?_${user.user_avatar}`;
        document.querySelector('#avatar_link_perfil').appendChild(user_avatar);
    };
    
    let logoutButton =  document.querySelector('#bt-user-logout');
    if(logoutButton){logoutButton.addEventListener('click', logout);};
    async function logout()  {
        const url = `${urlBase.api_auth}/logout`;
        const opt = {
            method:'POST',
            headers:{
                'Content-Types':'application/json',
                'Authorization':`Bearer ${sessionStorage.getItem('token')}`,
            }
        };
        const promise = await fetch( url, opt );
        handle_logout(promise);
    };
    
    function handle_logout (promise) {
        switch (promise.status) {
            case 202:
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                window.location.href = '/';
            break;
            default:
                alert(`Erro inesperado código: ${promise.status}`);
            break;
        };
    };
    
});