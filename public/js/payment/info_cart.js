let items = []
// funçoes fetch api
async function getUserInformation (){
    const url = `${urlBase.api_info}/get`;
    const option ={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer: ${token}`,
        }
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerUserInformation(promisse, response);
};getUserInformation();

async function getUserCart(){
    const url = `${urlBase.api_cart}/get`;
    const option ={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Baerer: ${token}`
        },
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdlerUserCart(promisse, response);
};getUserCart();

//tratamento de respostas do fetch api
function handdlerUserInformation(promisse, response){
    switch (promisse.status) {
        case 200:
            insertDataUser(response);
            break;
        default:
            window.alert(`Erro inesperado ao adicionar informaçoes deste usuário. código: ${promisse.status}`);
            break;
    };
};

function handdlerUserCart(promisse, response){
    switch (promisse.status) {
        case 200:
            insert_user_cart(response);
            break;
        default:
            window.alert(`Erro obter dados do carrinho deste usuário. código: ${promisse.status}`);
            break;
    };
};

//insert data in view
function insertDataUser (response){
    for(let i in response){
        if(document.getElementById(i)){
            document.getElementById(i).innerHTML = response[i];
        };
   };
};

function insert_user_cart (response){
    items = response;
    let countPrice = 0;
    response.forEach( element => {
        let div_container = document.createElement('div');
        let div_img = document.createElement('div');
        let div_text = document.createElement('div');

        let img = document.createElement('img');
        let title = document.createElement('h5');
        let quantity = document.createElement('span');
        let priceUn = document.createElement('span');
        let price = document.createElement('span');

        img.src = `/img-books/${element.books.front_cover}`;
        title.innerText = element.books.title;
        quantity.innerHTML = `Quantidade de produtoos: ${element.qtd_items}`;
        priceUn.innerHTML = `Preço por unidade: R$ ${element.item_price}`;
        price.innerHTML = `Preço total deste produto: R$${element.request_price}`;

        div_img.classList.add('box-img-book');
        div_text.classList.add('box-text-book');

        div_container.appendChild(div_img);
        div_container.appendChild(div_text);
        div_img.appendChild(img);
        div_text.appendChild(title);
        div_text.appendChild(quantity);
        div_text.appendChild(priceUn);
        div_text.appendChild(price);

        document.getElementById('items_cart').appendChild(div_container);
        countPrice += Number(element.request_price);
    });

    //price products insert
    document.querySelector('#unit-price').innerText = `R$: ${countPrice}`;
};

// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
const mercadopago = new MercadoPago('TEST-f37e5f30-0bcd-4553-be68-34e281670e15', {locale: 'pt-BR'});

// Handle call to backend and generate preference.
document.getElementById("checkout-btn").addEventListener("click", async function () {
    $('#checkout-btn').attr("disabled", true);
    document.querySelector('#button-confirm').style = 'display:block;';
    
    let data_cart =[];
    items.forEach(element => {
        let object = {};

        object.title = element.books.title;
        object.unit_price = Number(element.item_price);
        object.quantity = Number(element.qtd_items);

        data_cart.push(object);
    });

    const url = `${urlBase.api_mercado_pago}/post`;
    const option = {
        method:"POST",
        headers:{"Content-Type":"application/json","Authorization":`Baerer: ${token}`},
        body: JSON.stringify(data_cart),
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    handdler_api_mercadoPago(promisse, response);
});

function handdler_api_mercadoPago (promisse, response){
    switch (promisse.status) {
        case 200:
            createCheckoutButton(response.id);
            document.querySelector('#button-confirm').style = 'display:none;';
        break;
        default:
            alert("Unexpected error");
            $('#checkout-btn').attr("disabled", false);
        break;
    };
};

// Create preference when click on checkout button
function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  mercadopago.checkout({
    preference: {
      id: preferenceId
    },
    render: {
      container: '#button-checkout', // Class name where the payment button will be displayed
      label: 'Ir ao Pagamento', // Change the payment button text (optional)
    }
  });
};