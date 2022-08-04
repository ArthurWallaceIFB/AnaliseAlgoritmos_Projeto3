const Read = require("../Functions/ReadFiles");
const FirstFit = require("../Functions/FirstFit");
const NextFit = require("../Functions/NextFit");
const BestFit = require("../Functions/BestFit");

let data = Read.readInputFiles();


let firstFit_result = FirstFit.executarFirstFit(data);
//console.log(firstFit_result);

let nextFit_result = NextFit.executarNextFit(data);
//console.log(nextFit_result);

let bestFit_result = BestFit.executarBestFit(data);


let general_results = [];

data.map((file, i) => {
    let obj = { id: file.num_itens, FirstFit: firstFit_result[i], NextFit: nextFit_result[i], BestFit: bestFit_result[i] };
    general_results.push(obj);
})

console.log(general_results);