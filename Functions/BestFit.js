const Utils = require("./Utils");

function executarBestFit(data) {
    let resultados = [];

    data.map((file) => {
        let numItems = file.num_itens;
        let capacity = file.capacity;
        let items = file.items;
        let optimal_solution = file.optimal_solution;

        let { tempoMedio, qnt_buckets } = criarBestFit(items, numItems, capacity, 1);

        let aproximacao = (optimal_solution / qnt_buckets * 100).toFixed(2);

        resultados.push({ numItems, tempoMedio, qnt_buckets, optimal_solution, aproximacao });
    })

    return resultados;
}

function criarBestFit(items, numItems, capacity, qntRepeticoes) {
    let tempos = [];
    let results = [];

    for (let i = 0; i < qntRepeticoes; i++) {
        //console.log(`\n--- numItens: ${numItems}, capacidade: ${capacity}\n`);
        let t0 = performance.now();
        let result = bestFit(items, numItems, capacity);
        let t1 = performance.now();
        tempos.push((t1 - t0).toFixed(3));
        results.push(result);
    }
    let tempoMedio = Utils.calcularMediaTempos(tempos);
    let qnt_buckets = Utils.calcularAproximacaoMedia(results);

    return { tempoMedio, qnt_buckets };
}


function bestFit(items , numItems , capacity) {
 
    let buckets = 0;
    let bin_rem = Array(numItems).fill(0);

    for (i = 0; i < numItems; i++) {

        let j;
        let min = capacity + 1, bi = 0;

        for (j = 0; j < buckets; j++) {
            if (bin_rem[j] >= items[i] && bin_rem[j] - items[i] < min) {
                bi = j;
                min = bin_rem[j] - items[i];
            }
        }

        if (min == capacity + 1) {
            bin_rem[buckets] = capacity - items[i];
            buckets++;
        } else
            bin_rem[bi] -= items[i];
    }
    return buckets;
}


module.exports.executarBestFit = executarBestFit;