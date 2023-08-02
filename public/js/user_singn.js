window.addEventListener('load', () => {
    html.get('#myForm').addEventListener('submit', evt => {
        evt.preventDefault();
        SingUpNewUsers();
    });

    async function SingUpNewUsers (){
        const form = document.getElementById("myForm");
        const url = `${urlBase.api_auth}/sign`;
        let options = {
            method:"POST",
            body: new FormData(form)
        };
        const promisse = await fetch(url, options);
        const response = await promisse.json();
        
        RemoveErrorsMsg();
        handdlerPromiseResponse(promisse, response);
    };

    html.get('#clear_form').addEventListener('click', update);

    function handdlerPromiseResponse (promisse, response) {
        switch (promisse.status) {
            case 201:
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('user', JSON.stringify(response.user));
                location = "/";
                break;
            case 422:
                handdlerEmptyFields(response);
                break;
            case 409:
                handdlerEmptyFields(response);
                break;
            case 500:
                alert('file error');
                break;
            default:
                alert(`erro inesperado ${promisse.status}`);
                break;
        };
    };

    function handdlerEmptyFields(response){
        response.errors.forEach(element => {
            let msg = document.createElement('small');
            msg.style = 'color:red;';
            msg.innerText =element.msg;
            document.querySelector(`#err_${element.param}`).appendChild(msg);
        });
    };

    function RemoveErrorsMsg(){
        html.get("#err_username").innerHTML= '';
        html.get("#err_email").innerHTML= '';
        html.get("#err_re_email").innerHTML= '';
        html.get("#err_password").innerHTML= '';
        html.get("#err_re_password").innerHTML= '';
        html.get("#err_avatar").innerHTML= '';
    };
});