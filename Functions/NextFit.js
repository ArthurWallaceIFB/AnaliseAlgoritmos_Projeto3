const Utils = require("./Utils");

function executarNextFit(data, qntReps) {
    let resultados = [];

    data.map((file) => {
        let numItems = file.num_itens;
        let capacity = file.capacity;
        let items = file.items;
        let optimal_solution = file.optimal_solution;

        let { tempoMedio, qnt_buckets } = criarNextFit(items, numItems, capacity, qntReps);

        let aproximacao = (optimal_solution / qnt_buckets * 100).toFixed(2);

        resultados.push({ numItems, tempoMedio, qnt_buckets, optimal_solution, aproximacao });
    })

    return resultados;
}

function criarNextFit(items, numItems, capacity, qntRepeticoes) {
    let tempos = [];
    let results = [];

    for (let i = 0; i < qntRepeticoes; i++) {
        //console.log(`\n--- numItens: ${numItems}, capacidade: ${capacity}\n`);
        let t0 = performance.now();
        let result = nextFit(items, numItems, capacity);
        let t1 = performance.now();
        tempos.push((t1 - t0).toFixed(3));
        results.push(result);
    }
    let tempoMedio = Utils.calcularMediaTempos(tempos);
    let qnt_buckets = Utils.calcularAproximacaoMedia(results);

    return { tempoMedio, qnt_buckets };
}

function nextFit(items, numItems, capacity) {

    let buckets = 0, bin_rem = capacity;

    for (let i = 0; i < numItems; i++) {
        if (items[i] > bin_rem) {
            buckets++;
            bin_rem = capacity - items[i];
        }
        else
            bin_rem -= items[i];
    }
    return buckets;
}


module.exports.executarNextFit = executarNextFit;