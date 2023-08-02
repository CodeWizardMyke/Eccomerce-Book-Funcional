async function getFeedback(){
    const url = `${urlBase.api_feedback}/get/${locationString()}`;
    const option = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    let phater = document.querySelector('#result');
    let div = document.createElement('div');
    let h4 = document.createElement('h5');
    let menssage = document.createElement('p');

    h4.innerText = `Assunto: ${response.subject}`;
    menssage.innerHTML = `<strong>Mensagem:</strong> ${response.msg}`;

    div.id= 'msg_div';
    div.appendChild(h4);
    div.appendChild(menssage);
    phater.appendChild(div);
};getFeedback();

document.querySelector('#myForm').addEventListener('submit', async evt =>{
    evt.preventDefault();
    const myForm = document.querySelector('#myForm');
    const formData = new FormData(myForm);

    const url = `${urlBase.api_feedback}/put/${locationString()}?_method=PUT`;
    const option = {
        method:"POST",
        headers:{
            "Authorization":`Baerer ${token}`,
            "Content-Type":'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerPromissePut(promisse, response);
})

function handdlerPromissePut(promisse, response){
    switch (promisse.status) {
        case 200:
            window.alert('Feedback resolvido');
            location.href = '/admin/feedbacks';
            break;
        case 401:
            window.alert(`Erro ${response.error}, código ${promisse.status}`)
            break;
        default:
            window.alert(`Error inesperado ${promisse.status}`);
            break;
    };
};