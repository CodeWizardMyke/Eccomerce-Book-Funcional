async function getFeedback(){
    const url = `${urlBase.api_feedback}/get`;
    const option = {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`,
            "paginate":JSON.stringify(paginate),
        },
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    if(response.feedback.rows.length >0){
        nPages: response.nPages;

        response.feedback.rows.forEach(data => {
            let phater = document.querySelector('#result');

            let tr = document.createElement('tr');
            let id = document.createElement('td');
            let subject = document.createElement('td');
            let td_btn = document.createElement('td');
            let btn = document.createElement('a');
        
            id.innerText = data.id_feedback;
            subject.innerText = data.subject;
            btn.innerText = 'Ver Mensagem';
        
            btn.classList.add('btn', 'btn-light');
            btn.href = `${urlBase.view_admin}/feedback/show/${data.id_feedback}`;
            td_btn.appendChild(btn);
        
            tr.appendChild(id);
            tr.appendChild(subject);
            tr.appendChild(td_btn);
            phater.appendChild(tr);
        });
    }
};getFeedback();