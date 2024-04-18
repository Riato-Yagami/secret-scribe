# SecretScribe

## Overview
SecretScribe is a Node.js utility that randomly assigns secret values to a predefined list of names and securely saves these values in uniquely named text files within a specified directory. This program is designed to ensure confidentiality and manageability of sensitive assignments.

## Features
- **Random Value Assignment**: SecretScribe randomly assigns a value from a predefined list to each name and ensures that each assignment is unique.
- **Secure File Management**: Each assigned value is saved in a separate text file named after the individual, ensuring easy and secure access to the information.
- **Directory Management**: Before saving new data, the program clears the designated directory, ensuring that only current data is stored.

## Prerequisites
To run SecretScribe, you will need:
- Node.js installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

## Installation
1. Clone this repository to your local machine using:
   ```bash
   git clone https://github.com/Riato-Yagami/secret-scribe.git
