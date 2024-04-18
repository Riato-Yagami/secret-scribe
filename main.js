const fs = require('fs');
const path = require('path');
const input = require('./input');
const chalk = require('chalk');  // Import chalk
const resultPath = 'result';

// List of names
var values = input.values;
const names = input.names;

function getRandomAndRemove(arr) {
    if (arr.length === 0) {
        return null;
    }
    const index = Math.floor(Math.random() * arr.length); // Get a random index
    return arr.splice(index, 1)[0]; // Remove the element at that index and return it
}

// Function to clear the result directory
function clearDirectory(directory) {
    if (fs.existsSync(directory)) {
        fs.readdirSync(directory).forEach((file) => {
            const curPath = path.join(directory, file);
            fs.unlinkSync(curPath); // Deletes the file
        });
    } else {
        fs.mkdirSync(directory); // Create the directory if it doesn't exist
    }
}

// Function to create a file for each name with the assigned random value
function assignValuesAndCreateFiles(names) {
    // Clear the result directory first
    clearDirectory(resultPath);

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const value = getRandomAndRemove(values);
        if (!value) {
            console.log(chalk.red("ERROR : ") + chalk.bgRed.white('There are more names than values, process exited.'));
            break; // Exit the loop if no value is returned
        }
        const writePath = path.join(resultPath, `${name}.txt`);
        fs.writeFile(writePath, value, (err) => {
            if (err) throw err;
            console.log(chalk.greenBright(`${name}`) + chalk.green(`.txt`) + chalk.white(' saved with a secret value!'));
        });
    }
}

// Execute the function
assignValuesAndCreateFiles(names);