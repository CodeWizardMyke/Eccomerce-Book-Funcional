window.addEventListener('load' , ()=>{
    const urlBase = {
        get_carousel: '/api/products/carousel',
        link_product: '/product'
    };

    async function get_carousel_items () {
        const option ={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        };
        let promisse = await fetch( urlBase.get_carousel, option );
        let data = await promisse.json();

        carousel_indicators(data.content);
        carousel_inner(data.content);
    };get_carousel_items();

    function carousel_indicators(arrray){
        for(let i = 0; i <= arrray.length; i++){
            let button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('data-bs-target','#carouselExampleDark')
            button.setAttribute('data-bs-slide-to', i)
            if(i == 0){
                button.classList.add("active");
            };
            button.setAttribute('aria-current', 'true')
            button.setAttribute('aria-label', `Slide ${i}`);
            document.querySelector('.carousel-indicators').appendChild(button)
        };
    };

    function carousel_inner(array){
        for(let i = 0; i < array.length ; i++){
           
            let div = document.createElement('div');
            if(i == 0){div.classList.add('active');};
            div.classList.add('carousel-item');
            div.setAttribute('data-bs-interval', 10000);
            
            //container carousel
            let container_div = document.createElement('div');
            let image_div = document.createElement('div');
            let text_div = document.createElement('div');
            let img = document.createElement('img');
            let title = document.createElement('h5');
            let synopsis = document.createElement('p');
            let btn = document.createElement('a');

            img.src = `/img-books/${array[i].front_cover}`;
            title.innerText = array[i].title;
            synopsis.innerText = array[i].synopsis;
            btn.href = `/product/${array[i].id_books}`;
            btn.innerText = 'Ver mais sobre';

            text_div.classList.add('text-carousel');
            container_div.classList.add('carousel-container');
            image_div.classList.add('img-carousel');
            btn.classList.add('btn','btn-light','btn-carousel');
            synopsis.classList.add('limit-text');
            
            text_div.appendChild(title);
            text_div.appendChild(synopsis);
            image_div.appendChild(img);
            container_div.appendChild(image_div);
            container_div.appendChild(text_div);
            container_div.appendChild(btn);
            div.appendChild(container_div);
            document.querySelector('.carousel-inner').appendChild(div);
        };
    }
});