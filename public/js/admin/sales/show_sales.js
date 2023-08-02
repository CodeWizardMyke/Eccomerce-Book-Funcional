async function getSalesData(){
    const url = `${urlBase.api_purchases}/show`;
    const option= {
        method:"GET",
        headers:{
            "Authorization":`Baerer ${token}`,
            id:locationString(),
        },
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerPromisse(promisse, response);
};getSalesData();

function handdlerPromisse(promisse, response){
    switch (promisse.status) {
        case 200:
            if(response.info){
                addUserInformation(response.info);
            }else{
                addUserdata(response);
            };
            if(response.cart){
                addCartInformation(response.cart);
            };
            if(response.payment){
                addInfoPayment(response.payment);
            };
            break;
        default:
            break;
    };
};

function addUserdata(response){
    let phater = document.querySelector('.info_user');

    let boxTitle =  document.createElement('h4');
    let name = document.createElement('p');
    let email = document.createElement('p');

    boxTitle.innerHTML = "Dados Do Usuário";
    name.innerHTML = `Nome completo: <strong>${response.username}</strong>`;
    email.innerHTML = `email: <strong>${response.email}</strong>`;

    phater.appendChild(boxTitle);
    phater.appendChild(name);
    phater.appendChild(email);
};

function addUserInformation(response){
    let phater = document.querySelector('.info_user');

    let boxTitle =  document.createElement('h4');
    let name = document.createElement('p');
    let tell = document.createElement('p');
    let email = document.createElement('p');
    let cpf = document.createElement('p');
    let rg = document.createElement('p');
    let cep = document.createElement('p');
    let city = document.createElement('p');
    let district = document.createElement('p');
    let road = document.createElement('p');
    let complements = document.createElement('p');

    boxTitle.innerHTML = "Dados Do Usuário";
    name.innerHTML = `Nome completo: <strong>${response.full_name}</strong>`;
    tell.innerHTML = `Telefone Contato: <strong>${response.telephone}</strong>`;
    email.innerHTML = `email: <strong>${response.email}</strong>`;
    cpf.innerHTML = `CPF :<strong>${response.user_cpf}</strong>`;
    rg.innerHTML = `RG: <strong>${response.user_rg}</strong>`;
    cep.innerHTML = `CEP: <strong>${response.cep}</strong>`;
    city.innerHTML = `Cidade: <strong>${response.city}</strong>`;
    district.innerHTML = `Bairro: <strong>${response.district}</strong>`;
    road.innerHTML = `Rua: <strong>${response.road} N°: ${response.number}</strong>`;
    complements.innerHTML = `Complemento: <strong>${response.complements}</strong>`;

    phater.appendChild(boxTitle);
    phater.appendChild(name);
    phater.appendChild(tell);
    phater.appendChild(email);
    phater.appendChild(cpf);
    phater.appendChild(rg);
    phater.appendChild(cep);
    phater.appendChild(city);
    phater.appendChild(district);
    phater.appendChild(road);
    phater.appendChild(complements);
};

function addCartInformation(response){
    let {books} = response;
    let phater = document.querySelector('.cart_user');
    
    let title = document.createElement('p');
    let qtd = document.createElement('p');
    let format = document.createElement('p');
    let priceUn = document.createElement('p');
    let price = document.createElement('p');
    let payment = document.createElement('p');
    let delivery = document.createElement('p');
    let img = document.createElement('img');

    title.innerHTML = `Titulo: <strong>${books.title}</strong>`;
    qtd.innerHTML = `Quantidae: <strong>${response.qtd_items}</strong>`;
    format.innerHTML = `Formato: <strong>${response.type_selected}</strong>`;
    priceUn.innerHTML = `Preço Un: <strong>R$:${response.item_price}</strong>`;
    price.innerHTML = `Preço Final: <strong>R$:${response.request_price}</strong>;`
    payment.innerHTML = `Pagamento: <strong>${response.status}</strong>`;
    delivery.innerHTML = `Entrega: <strong>${response.status_delivery}</strong>`;

    img.src = `/img-books/${books.front_cover}`;

    document.querySelector('.img_book').appendChild(img);
    phater.appendChild(title);
    phater.appendChild(qtd);
    phater.appendChild(format);
    phater.appendChild(priceUn);
    phater.appendChild(price);
    phater.appendChild(payment);
    phater.appendChild(delivery);
};

function addInfoPayment(response){
    let phater = document.querySelector('.payment_user');
    id_payment = response.api_payment_id;

    let titleBox = document.createElement('h4');
    let number = document.createElement('p');
    let paymentForm = document.createElement('p');
    let paymentData = document.createElement('p');

    titleBox.innerText = 'Informações sobre o pedido';
    number.innerHTML = `Numero do pedido N°: <strong>${response.api_payment_id}</strong>`;
    paymentForm.innerHTML = `Forma de pagamento: <strong>${response.api_payment_type}</strong>`;
    paymentData.innerText = `Data: ${response.createdAt}`;

    phater.appendChild(titleBox);
    phater.appendChild(number);
    phater.appendChild(paymentData);
    phater.appendChild(paymentData);
};