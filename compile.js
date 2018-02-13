const path = require('path'); //help us build a paths. guarantee paths compatibility across compiling environment
const fs = require('fs'); //read in the content of the file
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); //always get set to the current working directory
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];
