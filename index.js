const Read = require("./Functions/ReadFiles");
const FirstFit = require("./Functions/FirstFit");
const NextFit = require("./Functions/NextFit");
const BestFit = require("./Functions/BestFit");
const Chart = require("./chart");

let data = Read.readInputFiles();


let firstFit_result = FirstFit.executarFirstFit(data);

let nextFit_result = NextFit.executarNextFit(data);

let bestFit_result = BestFit.executarBestFit(data);

let final_results = [];
let tableStructure = [];
data.map((file, i) => {
    let obj = { id: file.num_itens, FirstFit: firstFit_result[i], NextFit: nextFit_result[i], BestFit: bestFit_result[i] };
    final_results.push(obj);

    let tableObj = {QntItens: obj.id, FirstFit: (obj.FirstFit.aproximacao  + "%"), NextFit: (obj.NextFit.aproximacao + "%"), BestFit: (obj.BestFit.aproximacao + "%")};
    tableStructure.push(tableObj);
})

console.table(tableStructure);


console.log("\n---- GERANDO O GRÁFICO DA ANÁLISE ----\n")
Chart.generate(final_results);

console.log("✅ Gráfico salvo com sucesso! ✅\n")
console.log("Path: /graficos/TemposDeExecucao.png\n\n");