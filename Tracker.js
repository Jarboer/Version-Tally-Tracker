// Import process - Used to access the exit the program method
import('process');

// Import and expose prompt's methods
const prompt = require('prompt-sync')();

/**
 * This class is used to keep track of the version counters and update them
 */
class Tracker {
    // Declare the verion counter fields names in code
    mbc;    // Major breaking change
    feat;   // Feature
    fix;    // Bug fix

    // Constructor
    constructor(versionCounters) {
        /* Assign all of the parameters and values from versionCounters
        to this (Tracker)*/
        Object.assign(this, versionCounters);
    }

    /**
     * This method is used to display the current version
     */
    outputVersion() {
        console.log("Current version: " + this.mbc + "." + this.feat + "." + this.fix +"\n");
    }

    /**
     * Prompts the user to enter a command to update a version's count (Major breaking change, Feature, or Bug fix) or switch directions
     * 
     * @param {string} direction - The current direction: 'i' for increase, 'd' for decrease
     * @returns {string} - Returns the selected command: 'm' for Major breaking change, 'f' for Feature, 'b' for Bug fix, or 's' to switch the direction
     * @throws {Error} - Thrown if an invalid direction is given
     */
    getCommand(direction) {
        // Display the versions and instructions to switch directions
        console.log("Versions: (M)ajor breaking change, (F)eature, and (B)ug fix.");
        console.log("Enter 's' to switch directions.\n");

        // Determine the current mode
        if (direction === 'i') { // If the increase direction was given then output increase mode
            console.log("Current mode: Increase\n");
        } else if (direction === 'd') { // Otherwise, if the decrease direction was given then output decrease mode
            console.log("Current mode: Decrease\n");
        } else { // Otherwise, throw an error if an invalid direction is given
            throw new Error("Invalid direction given.");
        }

        // Prompt the user to enter thier command
        let command = prompt("Enter your command: ");

        this.handleProgramClosure(command); // Check for program closure

        // Validate user's response until it is 'm', 'f', 'b', or 's'
        while (command.toLowerCase() !== 'm' && command.toLowerCase() !== 'f' && command.toLowerCase() !== 'b' && command.toLowerCase() !== 's') {
            // Prompt the user to enter a valid command
            command = prompt("That's not a valid command, try again: ");
        }

        return command; // Return the selected command
    }

   /**
     * Updates the version counters based on the specified direction
     * 
     * @param {string} direction - The selected direction: 'i' for increase, 'd' for decrease
     * @param {string} selectedVersion - The selected version to update the count of: 'm' for Major breaking change, 'f' for Feature, or 'b' for Bug fix
     * @returns {boolean} - Returns true if the function completed successfully, otherwise, it returns false if the user wants to switch the direction
     * @throws {Error} - Thrown if an invalid direction or type is given
     */
    updateVersion(direction, selectedVersion) {
        let directionVal = 0; // Used to store the value by which the version counters will be updated

        // Determine the corresponding value for the direction
        if (direction === 'i') { // If the increase direction was given then increase the version counter by 1
            directionVal = 1;
        } else if (direction === 'd') { // Otherwise, if the decrease direction was given then decrease the version counter by 1
            directionVal = -1;
        } else { // Otherwise, throw an error if an invalid direction is given
            throw new Error("Invalid direction given.");
        }

        // Update the version counters based on the selected type
        switch (selectedVersion) {
            case 'm': // Update the Major breaking change counter and set the rest to 0
                // If the version change was invalid then return the method early
                if (!this.validVerChange(direction, this.mbc)) {
                    // The user wants to stick with the direction
                    return true;
                }

                // Update the counters
                this.mbc += directionVal;
                this.feat = 0;
                this.fix = 0;

                // A version was updated successfully
                return true;
            case 'f': // Update the Feature counter and set the Bug fix counter to 0
                // If the version change was invalid then return the method early
                if (!this.validVerChange(direction, this.feat)) {
                    // The user wants to stick with the direction
                    return true;
                }

                // Update the counters
                this.feat += directionVal;
                this.fix = 0;

                // A version was updated successfully
                return true;
            case 'b':  // Update the Bug fix counter
                // If the version change was invalid then return the method early
                if (!this.validVerChange(direction, this.fix)) {
                    // The user wants to stick with the direction
                    return true;
                }

                // Update the counter
                this.fix += directionVal;

                // The user wants to stick with the direction
                return true;
            default: // Throw an error if an invalid type is given
                throw new Error("Invalid type given."); 
        }
    }

    /**
     * Checks if a change in a version is valid based on the specified direction and current value
     * 
     * @param {string} direction - The direction of the version being changed
     * @param {number} value - The current value of the version being changed
     * @returns {boolean} - Returns true if the change is valid, otherwise, it returns false
     */
    validVerChange(direction, value) {
        // If the change is invalid then display an error and return false
        if (direction === 'd' && value <= 0) {
            console.log("\nError: Decreasing this version would make it negative, which isn't allowed. Try again.");
            return false;
        }
        
        return true; // Valid change
    }

    /**
     * Sets whether the direction should be increasing or decreasing
     * 
     * @param {string} direction - The current direction, either 'i' for increase or 'd' for decrease
     * @param {boolean} silent - Flag to determine if the method should run silently
     * @param {boolean} check - Flag to determine if the method should only check if all versions are currently at 0
     * @returns {string} Returns the selected direction ('i' for increase or 'd' for decrease)
     * @throws {Error} Thrown if an invalid direction is given
     */
    setIncOrDec(direction, silent, check) {
        // If all versions are currently at 0 then inform the user (if not run silent) and default to the increase direction
        if (this.mbc === 0 && this.feat === 0 && this.fix === 0) {
            // If the method is not being run silent then inform the user
            if (!silent) {
                console.log("\nInfo: All versions are currently at 0, defaulting to increase.");
            }

            return 'i';
        } else if (check) { // Otherwise, if the method is being run in check mode then return the current (unchanged) direction
            return direction;
        }

        // Swap the direction
        if (direction === 'i') { // If the increase direction was given then switch to decrease
            direction = 'd';
        } else if (direction === 'd') { // Otherwise, if the decrease direction was given then switch to increase
            direction = 'i';
        } else { // Otherwise, throw an error if an invalid direction is given
            throw new Error("Invalid direction given.");
        }

        return direction; // Return the selected direction ('i' or 'd')
    }

    /**
     * Checks if the program should close and exits gracefully if ctrl + c was pressed
     * 
     * @param {string} input - The input to check
     */
    handleProgramClosure(input) {
        // Exit the program gracefully when ctrl + c is pressed
        if (input === null) {
            console.log("\nEnding program. Goodbye.\n");
            process.exit();
        }
    }
}

// Export the class and all its methods
module.exports = Tracker;