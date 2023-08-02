document.querySelector('#form_search').addEventListener('submit', async evt => {
    evt.preventDefault();
    let key = document.querySelector('#prod_search').value;

    const url = `${urlBase.api_purchases}/search`;
    const option = {
        method:'GET',
        headers:{
            "Authorization": `Baerer ${token}`,
            "search": key,
            "paginate":JSON.stringify(paginate),
        },
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    document.querySelector('#result').innerHTML= "";
    
    if(response == null){
        window.alert('Não existe compra com este id');
    };
    if(response.api_payment_id){
        createElements(response);
    };
    if(response.payment.rows){
        response.payment.rows.forEach(element => {
            createElements(element);
        });
    };
    if(response.payment == null){
        window.alert('Não existe compra com este id');
    };

    function createElements(element){
        let tr = document.createElement('tr');
        let id = document.createElement('td');
        let form = document.createElement('td');
        let price = document.createElement('td');
        let status = document.createElement('td');
        let detail = document.createElement('td');
        let btn = document.createElement('a');

        id.innerText = element.api_payment_id;
        form.innerText = element.api_payment_type;
        price.innerText = element.price;
        status.innerText = element.status;
        status.innerText = element.status;

        btn.innerText= 'Mostrar';
        btn.classList.add('btn','btn-light');
        btn.href = `${urlBase.view_admin}/sales/show/${element.id_payment}`;

        detail.appendChild(btn);
        tr.appendChild(id);
        tr.appendChild(form);
        tr.appendChild(price);
        tr.appendChild(status);
        tr.appendChild(detail);

        document.querySelector('#result').appendChild(tr);
    };
});