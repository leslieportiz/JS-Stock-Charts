function getColor(stock) {
    if (stock === "GME") {
        return 'rgba(61, 161, 61, 0.7)'
    }
    if (stock === "MSFT") {
        return 'rgba(209, 4, 25, 0.7)'
    }
    if (stock === "DIS") {
        return 'rgba(18, 4, 209, 0.7)'
    }
    if (stock === "BNTX") {
        return 'rgba(166, 43, 158, 0.7)'
    }
}
function getHighest(values) {
    let highest = 0
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }
    })
    return highest
}

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // let response = await fetch('https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,ETH/BTC:Huobi,TRP:TSX&interval=1min&apikey=255c4fa4bbf74ad38ec3a364737253dd')
    let response = await fetch('https://api.twelvedata.com/time_series?apikey=255c4fa4bbf74ad38ec3a364737253dd&interval=1day&symbol=GME,MSFT,DIS,BNTX')
    let result = await response.json()
    console.log(result)

    // let GME = result.GME
    // let MSFT = result.MSFT
    // let DIS = result.DIS
    // let BNTX = result.BNTX
    // console.log(GME)
    // console.log(MSFT)
    // console.log(DIS)
    // console.log(BNTX)

    // const stocks = [GME, MSFT, DIS, BNTX];
    // console.log(stocks)

    // Bonus Note: 
    // Another way to write the above lines would to refactor it as:
    // const {GME, MSFT, DIS, BNTX} = result 
    // This is an example of "destructuring" an object
    // "Destructuring" creates new variables from an object or an array
    const { GME, MSFT, DIS, BNTX } = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];

    console.log(GME)
    console.log(stocks)
    //npm install @amcharts/amcharts5
    console.log(Chart)

    stocks.forEach(stock => stock.values.reverse())

    console.log(stocks[0].values)

    // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    getHighest(stock.values)
                ))            
            }]
        }
    })
    


}

main()