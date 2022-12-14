const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

function generate(resultados) {
    const width = 900; //px
    const height = 500; //px
    const backgroundColour = 'white';
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });

    let colors = ["#FF6133", "#339FFF", "#AC33FF", "#3CBC61"];
    let temposMetodos = {
        "FirstFit": [],
        "NextFit": [],
        "BestFit": []
    };

    let qntItens = [];

    resultados.map((file) => {
        temposMetodos.FirstFit.push(file.FirstFit.tempoMedio);
        temposMetodos.NextFit.push(file.NextFit.tempoMedio);
        temposMetodos.BestFit.push(file.BestFit.tempoMedio);

        qntItens.push(file.id)
    })

    let dataset = [];
    Object.keys(temposMetodos).map(function (method, index) {
        let methodName = method;
        let tempos = temposMetodos[method];

        let config = {
            label: methodName,
            data: tempos,
            fill: false,
            backgroundColor: colors[index],
            borderColor: colors[index],
            borderWidth: 1,
            xAxisID: 'xAxis1',
        }
        dataset.push(config);

    });


    const configuration = {
        type: 'line',   // for line chart
        data: {
            labels: qntItens,

            datasets: dataset
        },
        options: {
            scales: {
                y: {
                    suggestedMin: 0,
                    title: {
                        display: true,
                        text: 'Tempo de execução (ms)'
                    }
                }
            },
            layout: {
                padding: {
                    left: 40,
                    right: 60,
                    top: 20,
                    bottom: 20
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Análise Empírica - Tempos de execução',
                    font: { size: 20, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: "bottom"
                }
            }
        }
    }
    run(chartJSNodeCanvas, configuration);
}

async function run(chartJSNodeCanvas, configuration) {
    const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    const base64Image = dataUrl

    var base64Data = base64Image.replace(/^data:image\/png;base64,/, "");


    fs.writeFile(`graficos/TemposDeExecucao.png`, base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
    });
    return dataUrl
}

module.exports.generate = generate;