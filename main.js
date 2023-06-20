// Import the Tracker class to access its methods and variables
const Tracker = require("./Tracker.js");

// Used to store the direction the variables will go (increasing or decreasing)
let direction = '';
// Used to determine if the loop should continue executing
let continueLoop = true;

// Set the class's variables starting values
const tracker = new Tracker({
    mbc: 0,     // Major breaking change
    feat: 0,    // Feature
    fix: 0      // Bug fix
});

/**
 * This is the main program loop that keeps running the program.
 * It prompts the user for input and updates the version counters accordingly.
 */
while (true) {
    // If there is no direction (when the program starts) then output the version
    if (direction === '') {
        tracker.outputVersion();
    }

    // Prompt the user to choose whether to increase or decrease the version counters
    direction = tracker.setIncOrDec(false);

    // Default to true to prevent an infinite loop until user decides to exit
    continueLoop = true;

    // Loop to keep updating the version in the specified direction
    while (continueLoop) {
        // Ask the user which version counter to update and determine if they want 
        // to continue in the same direction.
        continueLoop = tracker.updateVersion(direction);

        // Check silently whether or not the dirrection should be changed to increase (if all versions are 0)
        let tempDirection = tracker.setIncOrDec(true);
        // If the tempDirection is not an empty string then update the direction
        if (tempDirection != '') {
            direction = tempDirection;
        }

        console.log("\n----------------------------\n");

        // Output the version
        tracker.outputVersion();
    }
}