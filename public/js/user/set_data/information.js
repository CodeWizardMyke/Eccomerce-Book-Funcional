document.querySelector('#cep').addEventListener('blur', async (e)  => {
    let search = document.querySelector('#cep').value.replace('-', '');
    const url =`${urlBase.api_via_cep}/${search}/json`;
    const option = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    function showResult (result) {
        for(let index in result){
            if(document.querySelector('#'+ index)){
                document.querySelector('#' + index).value = result[index];
            };
        };
    };showResult(response);
});

document.querySelector('#myForm').addEventListener('submit', async (evt) => {
    evt.preventDefault();
    updateErros();
    let {id_user} = JSON.parse(sessionStorage.getItem('user'));
    const myForm = document.querySelector('#myForm');
    const formData = new FormData(myForm);

    const url = `${urlBase.api_info}/post`;
    const option = {
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "Authorization":`Baerer ${token}`,
            id:id_user,
        },
        body: new URLSearchParams(formData).toString(),
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerPromisse(promisse, response);
});

function handdlerPromisse(promisse, response){
    switch (promisse.status) {
        case 201:
            window.alert('Dados registrado com sucesso!');
            window.location.href =`${urlBase.views_user}/profile`;
            break;
        case 401:
            handdlerErrors(response);
        break;
        case 409:
            alert('você já possui um registro de dados pesoais');
            window.location.href= `${urlBase.views_user}/profile`;
        default:
            window.alert(`Erro inesperado ${promisse.status}`);            
            break;
    };
};

function handdlerErrors(response){
    let i = 0
    response.errors.forEach(element => {
        let string = `#err_${element.param}`;
        let span = document.createElement('span');

        span.innerText = element.msg;
        span.id = i;
        span.classList.add('error');

        document.querySelector(string).appendChild(span);
        i++;
    });
};

function updateErros(){
    for(let i = 0 ; i < 13 ; i++){
        let string = `${i}`;
        let div = document.getElementById(string);
        if(div){
            let phater = div.parentNode;
            phater.innerHTML = "";
        };
    };
};