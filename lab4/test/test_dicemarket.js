
const _deploy_contracts = require("../migrations/2_deploy_contracts");
const truffleAssert = require('truffle-assertions');
const web3 = require("web3");

var Dice = artifacts.require("../contracts/Dice.sol");
var DiceBattle = artifacts.require("../contracts/DiceBattle.sol");
var DiceMarket = artifacts.require("../contracts/DiceMarket.sol");

contract('DiceMarket', function (accounts) {

    before(async () => {
        diceInstance = await Dice.deployed();
        diceMarketInstance = await DiceMarket.deployed();
        await diceInstance.add(6, 66, { from: accounts[0], value: web3.utils.toWei('0.011', "ether") });
        await diceInstance.transfer(0, diceMarketInstance.address, { from: accounts[0] });
    });


    it('Test Sequence', async () => {
        let list = await diceMarketInstance.list(0, web3.utils.toWei('2', 'ether'), {from: accounts[0]});
        truffleAssert.passes(list, 'list dice');

        let buy = await diceMarketInstance.buy(0, {from: accounts[1], value: 3e18});
        truffleAssert.passes(buy, 'dice_bought');

        let dice0 = await diceInstance.dices(0);
        let currentOwner = dice0["owner"];
        assert.equal(currentOwner, accounts[1], "Ownership transfer is wrong");
        //let diceowner = await dice.getOwner.call(dice1);
        //assert.equal(dice1Owner, user2);
    });
})
