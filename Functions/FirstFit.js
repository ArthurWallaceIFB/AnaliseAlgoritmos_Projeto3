const Utils = require("../Functions/Utils");

function executarFirstFit(data, qntReps) {
    let resultados = [];

    data.map((file) => {
        let numItems = file.num_itens;
        let capacity = file.capacity;
        let items = file.items;
        let optimal_solution = file.optimal_solution;

        let {tempoMedio, qnt_buckets} = criarFirstFit(items, numItems, capacity, qntReps);

        let aproximacao = (optimal_solution/qnt_buckets * 100).toFixed(2);

        resultados.push({ numItems, tempoMedio, qnt_buckets, optimal_solution, aproximacao });
    })

    return resultados;
}

function firstFit(items, numItems, capacity) {
    let buckets = [];

    for (let i = 0; i < numItems; i++) {
        let j;
        for (j = 0; j < buckets.length; j++) {
            if (buckets[j] > items[i]) {
                buckets[j] -= items[i];
                break;
            }
        }
        if (j == buckets.length) buckets.push(capacity - items[i]);
    }

    return buckets.length;
}

function criarFirstFit(items, numItems, capacity, qntRepeticoes) {
    let tempos = [];
    let results = [];

    for (let i = 0; i < qntRepeticoes; i++) {
        //console.log(`\n--- numItens: ${numItems}, capacidade: ${capacity}\n`);
        let t0 = performance.now();
        let result = firstFit(items, numItems, capacity);
        let t1 = performance.now();
        tempos.push((t1 - t0).toFixed(3));
        results.push(result);
    }
    let tempoMedio = Utils.calcularMediaTempos(tempos);
    let qnt_buckets = Utils.calcularAproximacaoMedia(results);

    return {tempoMedio, qnt_buckets};
}

module.exports.executarFirstFit = executarFirstFit;