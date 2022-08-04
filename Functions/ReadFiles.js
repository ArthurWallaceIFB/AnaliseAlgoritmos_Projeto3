let fs = require('fs');
let path = require('path');

let filesNames = ["Waescher_TEST0005", "Waescher_TEST0014", "Waescher_TEST0022", "Waescher_TEST0030", "Waescher_TEST0044", "Waescher_TEST0049", "Waescher_TEST0054", "Waescher_TEST0055A", "Waescher_TEST0055B", "Waescher_TEST0058", "Waescher_TEST0065", "Waescher_TEST0068", "Waescher_TEST0075", "Waescher_TEST0082", "Waescher_TEST0084", "Waescher_TEST0095", "Waescher_TEST0097"];

let optimal_solutions = [28, 23, 15, 27, 14, 11, 14, 15, 20, 20, 16, 12, 13, 24, 16, 16, 12];

let filesResults = [];

function readInputFiles() {

    filesNames.map((file, i) => {
        let jsonPath = path.join(__dirname, '..', 'binpacking-instancias', 'input', (file + ".txt"));
        let jsonString = fs.readFileSync(jsonPath, 'utf8').split("\r\n")
        let num_itens = jsonString.splice(0, 1)[0];
        let capacity = jsonString.splice(0, 1)[0];
        let items = jsonString;

        let obj = {
            num_itens: num_itens,
            capacity: capacity,
            optimal_solution: optimal_solutions[i],
            items: items
        }
        filesResults.push(obj);

    })

    return filesResults;
}


module.exports.readInputFiles = readInputFiles;