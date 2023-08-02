window.addEventListener('load', async () =>{
    if(user){
        insert_avatar_username();
        user_modify_insert_token();
    };
    
    function insert_avatar_username (){
        let img = document.createElement('img');
        img.src = `${urlBase.user_avatar}/${user.user_avatar}`;
        img.classList.add('border-radius-50');
 
        let h2 = document.createElement('h2');
        h2.innerText = userFirstAndMiddleName();

        document.querySelector('#avatar-usuario').appendChild(img);
        document.querySelector('#avatar-usuario').appendChild(h2);
    };

    function user_modify_insert_token (){
        let div_modify_user = document.querySelector('#form_user_config');
        if(div_modify_user){
           let img_user = document.querySelector('#img_user_modify');
           img_user.src = `${urlBase.user_avatar}/${user.user_avatar}`;

           let input_id = document.createElement('input');
           input_id.type = 'hidden'; input_id.value = token; input_id.name = 'u_token';
           html.get('#form_user_modify').appendChild(input_id);
        };
    };
});