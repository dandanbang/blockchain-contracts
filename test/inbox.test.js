const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //whenever we are working with constructor function, we capitalize it. Purpose of one instance = one network connection.
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();
  // use one of the accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface)) // abi: teaches web3 about what methods an inbox contract has
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] }) // tell web3 that we want to deploy a new copy of this contract
    .send({ from: accounts[0], gas: '1000000' }); // instructs web3 to send out a transaction that creates this contract

    inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address); // making sure there's an address to the contract
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it('can change messages successfuly', async () => {
    await inbox.methods.setMessage('Bye There').send( { from: accounts[0] } ); // specify who's issuing the transaction when we send transaction
    const newMessage = await inbox.methods.message().call();
    assert.equal('Bye There', newMessage);
  });
});
