// inputs checkbox select 
$(function(){
    $('input.checkgroup').click(function(){
       if($(this).is(":checked")){
          $('input.checkgroup').attr('disabled',true);
          $(this).removeAttr('disabled');
       }else{
          $('input.checkgroup').removeAttr('disabled');
       }
    })
 })

document.querySelector('#form_search').addEventListener('submit', evt => {
   evt.preventDefault();
   UsersSearching();
});

async function UsersSearching () {
   let search = document.querySelector('#valSearch').value;
   let check = document.querySelectorAll("input[type= 'checkbox']");
   
   function checked (){
      for (let  i =0 ; i < check.length ; i++){
         if(!check[i].disabled){
            let name = check[i].name
            return {type:name}
         }
      }
   }

   const url = `${urlBase.api_users}/search`;
   paginate.size = 15

   const option ={
       method:'GET',
       headers:{
           "Authorization":`Baerer: ${token}`,
           "Content-Type":"application/json",
           "body":JSON.stringify(checked()),
           "search": JSON.stringify(search),
           "paginate":JSON.stringify(paginate)
       },
   };

   const promisse = await fetch( url, option );
   const response = await promisse.json();

   handdlerUserSearch(promisse, response);
}

function handdlerUserSearch (promisse, response){
   switch (promisse.status) {
      case 200:
         nPages = response.nPages
         InsertDataUsers(response);
         break;
      default:
         window.alert(`Erro inesperado Cód: ${promisse.status}`);
         break;
   };
};

function InsertDataUsers(response){
   Update();
   if(response.users.count > 0){
      response.users.rows.forEach(element => {
         let tr = document.createElement('tr');
         let username = document.createElement('td');
         let email = document.createElement('td');
         let td_show = document.createElement('td');
         let showMore = document.createElement('a');
   
         username.innerText = element.username;
         email.innerText = element.email;
         showMore.innerText = 'Ver';
         showMore.href = `${urlBase.view_admin}/user/${element.id_user}`;
   
         showMore.classList.add('btn','btn-light','border');
   
         tr.appendChild(username);
         tr.appendChild(email);
         td_show.appendChild(showMore);
         tr.appendChild(td_show);
         document.querySelector('#result').appendChild(tr);
      });
   }else{
      Update();
      let h4 = document.createElement('h4');
      h4.innerText = "Nenhum dado encontrado!"
      document.querySelector('#noDataReturn').appendChild(h4);
   }
}

document.querySelector('#previous').addEventListener('click', e =>{
   e.preventDefault();
   if( Number.parseInt(nPages) > 1 ){
       controls_paginate.previous();
       Update()
       UsersSearching();
   }
});
document.querySelector('#next').addEventListener('click', e =>{
   e.preventDefault();
   if( Number.parseInt(nPages) > paginate.page ){
       controls_paginate.next();
       Update()
       UsersSearching();
   };
});

const Update =() => {
   document.querySelector('#result').innerHTML = "";
   document.querySelector('#noDataReturn').innerHTML = "";
};