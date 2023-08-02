function locationString(){
    let query = window.location.href;
    let arr = query.split('/');
    return arr[arr.length - 1 ];
};

async function getUserAdmin(){
    const url = `${urlBase.api_users}/auth`;
    const option = {
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Baerer ${token}`,
        }
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerPromisse(promisse,response)
}getUserAdmin();

function handdlerPromisse(promisse, response){
    switch (promisse.status) {
        case 200:
            if(response){
                insertDataAdmin(response);
            };
            break;
        default:
            window.alert(`Error ${promisse.status}`);
            location.href = '/'
            break;
    }
}

function insertDataAdmin(data){
    let phaterDiv = document.querySelector('.user_adm');
    let img = document.createElement('img');
    let name = document.createElement('small');

    img.src = `/images/users/${data.user_avatar}`;
    name.innerText = userFirstAndMiddleName();

    phaterDiv.appendChild(img);
    phaterDiv.appendChild(name);
};

//manager products
document.querySelector('#btn_prodCreate').addEventListener('click', ()=>{ location.href = `${urlBase.view_admin}/prod/create`});
document.querySelector('#btn_prodSearch').addEventListener('click', ()=>{ location.href = `${urlBase.view_admin}/prod/search`});

//manager users//
document.querySelector('#btn_userCreate').addEventListener('click', ()=>{ location.href = `${urlBase.view_admin}/user/create`});
document.querySelector('#btn_userSearch').addEventListener('click', ()=>{ location.href = `${urlBase.view_admin}/user/search`});

document.querySelector('#btn_graphics').addEventListener('click', ()=>{ location.href = `${urlBase.view_admin}/sales`});
document.querySelector('#saleSearch').addEventListener('click', ()=>{ location.href = `${urlBase.view_admin}/sales/search`});

document.querySelector('#feedback_msg').addEventListener('click',()=>{location.href = `${urlBase.view_admin}/feedbacks`});