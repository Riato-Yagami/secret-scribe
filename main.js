const fs = require('fs');
const path = require('path');
const input = require('./input');
const config = require('./config');
const chalk = require('chalk');  // Import chalk
const resultPath = 'results';

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

function reload(values, names) {
    return new Promise((resolve, reject) => {
        fs.readdir(resultPath, (err, files) => {
            if (err) {
                console.log(chalk.red('ERROR: ') + chalk.white('Failed to read the result directory.'));
                reject(err);
                return;
            }

            let filesProcessed = 0;

            if (files.length === 0) {
                resolve();
            }

            files.forEach(file => {
                const name = path.basename(file, '.txt'); // Remove the '.txt' extension to get the name

                fs.readFile(path.join(resultPath, file), 'utf8', (err, value) => {
                    if (err) {
                        console.log(chalk.red('ERROR: ') + chalk.white(`Failed to read value from ${file}.`));
                        reject(err);
                        return;
                    }

                    const nameIndex = names.indexOf(name);
                    if (nameIndex !== -1) {
                        names.splice(nameIndex, 1);
                    }

                    const valueIndex = values.indexOf(value.trim());
                    if (valueIndex !== -1) {
                        values.splice(valueIndex, 1);
                    }

                    filesProcessed++;
                    if (filesProcessed === files.length) {
                        console.log(chalk.blue('LOADING') + " complete; " + chalk.blueBright(`${names.length} name(s)`) + " remaining");
                        resolve();
                    }
                });
            });
        });
    });
}

// Function to create a file for each name with the assigned random value
async function assignValuesAndCreateFiles(names) {
    // Clear the result directory first

    if(config.reset){
        clearDirectory(resultPath);
    }else{
        await reload(values,names)
    }

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