require('process');

const prompt = require('prompt-sync')();

let mbc = 0
let feat = 0
let fix = 0

function outputVersion() {
    console.log("Current version: " + mbc + "." + feat + "." + fix +"\n");
}

function readType(direction) {
    console.log("\nVersion types: (M)ajor breaking change, (F)eature, and (B)ug fix.");
    console.log("Enter 'e' to go change dirrection.")

    let dirrectionString = '';

    if (direction === 'i') {
        dirrectionString = "Increase";
    } else if (direction === 'd') {
        dirrectionString = "Decrease";
    } else {
        throw new Error("Invalid dirrection given");
    }

    let response = prompt(dirrectionString + " what version? ");

    // if (response.toLowerCase() !== 'm' || response.toLowerCase() !== 'f' || response.toLowerCase() !== 'b') {
    //     console.log("That's not a valid response, try again.")
    // }

    checkForProgramClose(response);

    while (response.toLowerCase() !== 'm' && response.toLowerCase() !== 'f' && response.toLowerCase() !== 'b' && response.toLowerCase() !== 'e') {
        response = prompt("That's not a valid response, try again. ");
    }

   return response;
}

function updateVersion(direction) {
    let type = readType(direction);

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
            if (!validChange(direction, mbc)) {
                break;
            }

            mbc += dirrectionVal;
            feat = 0;
            fix = 0;
            // The function completed
            return true;
        case 'f':
            if (!validChange(direction, feat)) {
                break;
            }

            feat += dirrectionVal;
            fix = 0;
            // The function completed
            return true;
        case 'b':
            if (!validChange(direction, fix)) {
                break;
            }

            fix += dirrectionVal;
            // The function completed
            return true;
        case 'e': // The user wants to change the direction
            return false;
        default:
            throw new Error("Invalid type");
    }
}

function validChange(direction, value) {
    if (direction === 'd' && value <= 0) {
        console.log("Error: Decreasing this version would make it negative which isn't allowed. Try again.");
        return false;
    } 
    
    return true;
}

function setIncOrDec() {
    if (mbc == 0 && feat == 0 && fix == 0) {
        console.log("Do you want to (i)ncrease or (d)ecrease a version? ");
        console.log("All versions are currently at 0, defaulting to increase.");

        return 'i';
    }

    let response = prompt("Do you want to (i)ncrease or (d)ecrease a version? ");

    checkForProgramClose(response);

    while (response.toLowerCase() !== 'i' && response.toLowerCase() !== 'd') {
        response = prompt("That's not a valid response, try again. ");
    }

   return response;
}

function checkForProgramClose(response) {
    // Exit the program gracefully when ctrl + c is pressed
    if (response == null) {
        console.log("\nEnding program. Goodbye.")
        process.exit();
    }
}

function main() {
    let direction = '';
    let continueLoop = true;
    
    if (direction == '')
        outputVersion();

    direction = setIncOrDec();

    while (continueLoop != false) {
        continueLoop = updateVersion(direction);
        console.log("\n----------------------------\n");

        outputVersion();
    }
}

while(true) {
    main();
}