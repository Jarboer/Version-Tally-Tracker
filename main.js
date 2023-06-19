const prompt = require('prompt-sync')();

let mbc = 0
let feat = 0
let fix = 0

function outputVersion() {
    console.log("Current version: " + mbc + "." + feat + "." + fix);
}

function readType() {
    let response = prompt('Increase what version? ');

    // if (response.toLowerCase() !== 'm' || response.toLowerCase() !== 'f' || response.toLowerCase() !== 'b') {
    //     console.log("That's not a valid response, try again.")
    // }

    while (response.toLowerCase() !== 'm' && response.toLowerCase() !== 'f' && response.toLowerCase() !== 'b') {
        response = prompt("That's not a valid response, try again. ");
    }

   return response;
}

function updateVersion() {
    let type = readType();

    switch (type) {
        case 'm':
            mbc += 1;
            feat = 0;
            fix = 0;
            break;
        case 'f':
            feat += 1;
            fix = 0;
            break;
        case 'b':
            fix += 1;
            break;
        default:
            throw new Error("Invalid type");
    }
}

function main() {
    outputVersion();

    console.log("\nVersion types: (M)ajor breaking change, (F)eature, and (B)ug fix");

    updateVersion();
}

while(true) {
    main();
}

