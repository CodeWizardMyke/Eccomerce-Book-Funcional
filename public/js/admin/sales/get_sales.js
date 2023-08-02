async function getSales(){
    const url = `${urlBase.api_purchases}/sales`;
    const option = {
        method:"GET",
        headers:{
            "Authorization":`Baerer ${token}`,
            "paginate":JSON.stringify(paginate),
        },
    };
    const promisse = await fetch(url, option);
    const response = await promisse.json();

    
    if(response.sales.length == 0 ){
        let div = document.createElement('div');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');


        h3.innerText = 'Gráfico de vendas'
        p.innerText= 'Não foi possível gerar um gráfico, nenhuma venda foi encontrada no banco de dados'
        div.classList.add('msg-graph')

        div.appendChild(h3)
        div.appendChild(p)
        document.querySelector('#chart_div').appendChild(div)
    }else{
        document.querySelector('#chart_div').innerHTML = ''
        let total = 0;
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        let arr = [ ['mês', 'Vendas', 'Dispesas'], ];

        response.sales.forEach(element => {
            const data = new Date(Date.UTC(2000, element.mes, 1));
            const mesString = data.toLocaleString('pt-BR', { month: 'long' });
            
            total += Number(element.total_vendas);
            arr.push(
                [mesString, Number(element.total_vendas), 60]
            )
        })
        let total_price = document.querySelector('#total_price');
        total_price.innerHTML = `Valor total arecadado <strong>R$: ${total}</strong>`;
    
        function drawChart() {
            var data = google.visualization.arrayToDataTable(arr);
            var options = {
                title: 'Histórico de vendas do site',
                hAxis: {title: 'Meses',  titleTextStyle: {color: '#333'}},
                vAxis: {minValue: 0},
            };
            var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        };
    }
};getSales();