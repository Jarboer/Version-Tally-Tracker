/**
 * TODO:
 *      - Show error message about not being able to decrease below the previous prompt and make the prompt show on that line
 *      - Make it more clear when the mode is switched?
 */

// Import the Tracker class to access its methods and variables
const Tracker = require("./Tracker.js");

// Used to store the direction the variables will go (increasing or decreasing)
let direction = '';

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
    // If there is no direction (when the program starts) then output the version and set the default direction to increase
    if (direction === '') {
        tracker.outputVersion();
        // Set the default direction by calling setIncOrDec in silent, non-check mode
        direction = tracker.setIncOrDec(direction, true, false);
    }

    // Prompt the user to enter a command
    let command = tracker.getCommand(direction);

    // If command equals 's' then the user wants to switch the direction
    if (command === 's') {
        // Call setIncOrDec in non-silent, non-check mode
        direction = tracker.setIncOrDec(direction, false, false);
    } else {
        // Update the version counter based on the choosen direction and command value
        tracker.updateVersion(direction, command);

        // Check whether or not the dirrection should be changed to increase (if all versions are 0) 
        // by calling it in non-silent, check mode
        direction = tracker.setIncOrDec(direction, false, true);
    }

    console.log("\n----------------------------\n");

    // Output the version
    tracker.outputVersion();
}