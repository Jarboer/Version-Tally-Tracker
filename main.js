const prompt = require('prompt-sync')();

let mbc = 0
let feat = 0
let fix = 0

function outputVersion() {
    console.log("Current version: " + mbc + "." + feat + "." + fix +"\n");
}

function readType(direction) {
    console.log("\nVersion types: (M)ajor breaking change, (F)eature, and (B)ug fix");

    let dirrectionString = '';

    if (direction === 'i') {
        dirrectionString = "Increase";
    } else if (direction === 'd') {
        dirrectionString = "Decrease";
    } else {
        throw new Error("Invalid dirrection given");
    }

    let response = prompt(dirrectionString + ' what version? ');

    // if (response.toLowerCase() !== 'm' || response.toLowerCase() !== 'f' || response.toLowerCase() !== 'b') {
    //     console.log("That's not a valid response, try again.")
    // }

    while (response.toLowerCase() !== 'm' && response.toLowerCase() !== 'f' && response.toLowerCase() !== 'b') {
        response = prompt("That's not a valid response, try again. ");
    }

   return response;
}

function updateVersion(direction) {
    console.log("Dirrection: " + direction);

    let type = readType(direction);

    console.log("Dirrection: " + direction);

    let dirrectionVal = 0;

    if (direction === 'i') {
        dirrectionVal = 1;
    } else if (direction === 'd') {
        dirrectionVal = -1;
    } else {
        throw new Error("Invalid dirrection given");
    } 

    switch (type) {
        case 'm':
            mbc += dirrectionVal;
            feat = 0;
            fix = 0;
            break;
        case 'f':
            feat += dirrectionVal;
            fix = 0;
            break;
        case 'b':
            fix += dirrectionVal;
            break;
        default:
            throw new Error("Invalid type");
    }
}

function setIncOrDec() {
    let response = prompt('Do you want to (i)ncrease or (d)ecrease the version? ');

    while (response.toLowerCase() !== 'i' && response.toLowerCase() !== 'd') {
        response = prompt("That's not a valid response, try again. ");
    }

   return response;
}

function main() {
    outputVersion();

    let direction = setIncOrDec();

    console.log("Dirrection: " + direction);

    updateVersion(direction);

    console.log("\n----------------------------\n");
}

while(true) {
    main();
}