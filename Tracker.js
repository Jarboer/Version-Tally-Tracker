// Import process - Used to access the exit the program method
require('process');

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
     * Prompts the user to choose a version type (Major breaking change, Feature, or Bug fix)
     * 
     * @param {string} direction - The selected direction: 'i' for increase, 'd' for decrease
     * @returns {string} - Returns the selected version type: 'm' for Major breaking change, 'f' for Feature, 'b' for Bug fix, or 'e' to change the direction
     * @throws {Error} - Thrown if an invalid direction is given
     */
    readType(direction) {
        // Display available version types and instructions to change direction
        console.log("\nVersion types: (M)ajor breaking change, (F)eature, and (B)ug fix.");
        console.log("Enter 'e' to change direction.");

        // Used to store the full direction string
        let directionString = '';

        // Convert the single character direction to a full string direction
        if (direction === 'i') { // If the increase direction was given then set the string to it
            directionString = "Increase";
        } else if (direction === 'd') { // Otherwise, if the decrease direction was given then set the string to it
            directionString = "Decrease";
        } else { // Otherwise, throw an error if an invalid direction is given
            throw new Error("Invalid direction given.");
        }

        // Prompt the user for the version to update
        let response = prompt(directionString + " what version? ");

        this.handleProgramClosure(response); // Check for program closure

        // Validate user's response until it is 'm', 'f', 'b', or 'e'
        while (response.toLowerCase() !== 'm' && response.toLowerCase() !== 'f' && response.toLowerCase() !== 'b' && response.toLowerCase() !== 'e') {
            // Prompt the user for the version to update
            response = prompt("That's not a valid response, try again. ");
        }

        return response; // Return the selected version type
    }

   /**
     * Updates the version counters based on the specified direction
     * 
     * @param {string} direction - The selected direction: 'i' for increase, 'd' for decrease
     * @returns {boolean} - Returns true if the function completed successfully, otherwise, it returns false if the user wants to change the direction
     * @throws {Error} - Thrown if an invalid direction or type is given
     */
    updateVersion(direction) {
        // Prompt the user to choose a version type and store it
        let type = this.readType(direction);

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
        switch (type) {
            case 'm': // Update the Major breaking change counter and set the rest to 0
                // If the change was invalid then return the method early
                if (!this.validChange(direction, this.mbc)) {
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
                // If the change was invalid then return the method early
                if (!this.validChange(direction, this.feat)) {
                    // The user wants to stick with the direction
                    return true;
                }

                // Update the counters
                this.feat += directionVal;
                this.fix = 0;

                // A version was updated successfully
                return true;
            case 'b':  // Update the Bug fix counter
                // If the change was invalid then return the method early
                if (!this.validChange(direction, this.fix)) {
                    // The user wants to stick with the direction
                    return true;
                }

                // Update the counter
                this.fix += directionVal;

                // The user wants to stick with the direction
                return true;
            case 'e': // The user wants to change the direction
                return false; 
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
    validChange(direction, value) {
        // Determine if the change is valid
        if (direction === 'd' && value <= 0) {
            console.log("Error: Decreasing this version would make it negative, which isn't allowed. Try again.");
            return false;
        }
        
        return true; // Valid change
    }


    /**
     * Prompts the user to choose whether to increase or decrease a version
     * 
     * @returns {string} - Returns the selected direction: 'i' for increase, 'd' for decrease
     */
    setIncOrDec() {
        // Check if all versions are currently at 0
        if (this.mbc === 0 && this.feat === 0 && this.fix === 0) {
            console.log("Do you want to (i)ncrease or (d)ecrease a version?");
            console.log("All versions are currently at 0, defaulting to increase.");

            return 'i'; // Default to increase ('i') when all versions are at 0
        }

        // Prompt the user for the direction
        let response = prompt("Do you want to (i)ncrease or (d)ecrease a version? ");

        this.handleProgramClosure(response); // Check for program closure

        // Validate the user's response until it is 'i' or 'd'
        while (response.toLowerCase() !== 'i' && response.toLowerCase() !== 'd') {
            // Prompt the user for the direction
            response = prompt("That's not a valid response, try again. ");
        }

        return response; // Return the selected direction ('i' or 'd')
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