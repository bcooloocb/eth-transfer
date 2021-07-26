const path = require('path');
const fs = require('fs');
const solc = require('solc');

const transferPath = path.resolve(__dirname, 'contracts', 'Transfer.sol');
const source = fs.readFileSync(transferPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Transfer'];
