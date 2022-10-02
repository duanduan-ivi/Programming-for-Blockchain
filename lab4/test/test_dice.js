
const Dice = artifacts.require("Dice");
const truffleAssert = require('truffle-assertions');
const web3 = require("web3");

contract('Dice', function (accounts) {

    before(async () => {
        diceInstance = await Dice.deployed();
    });
    console.log("Test Dice");

    it('1. Dice Add - Test that if > 0.01eth is needed to create a dice', async () => {
        // no await in const, await in try
        const addDiceFail = diceInstance.add(1, 1, { from: accounts[1], value: web3.utils.toWei('0.1', "ether") });

        try {
            await addDiceFail;
            // assert(false)
        } catch (err) {
            // console.log('err.message:', err.message)
            assert.deepStrictEqual(err.message, "at least 0.01 ETH is needed to spawn a new dice");
        }

    });

    it('2. Dice Roll - Test that just owner can roll Dice', async () => {
        //let r1 = await diceInstance.roll(0, { from: accounts[1] });
        //let r2 = await diceInstance.roll(1, { from: accounts[2] });

        //truffleAssert.eventEmitted(r1, 'rolling');
        //truffleAssert.eventEmitted(r2, 'rolling');

        let tfail = diceInstance.roll(0, { from: accounts[1] });

        try {
            await tfail;
            // assert(false)
        } catch (err) {
            // console.log('err.message:', err.message)
            assert.deepStrictEqual(err.message, "Dice can only be rolled by owner ");
        }

    });


    it('3. Dice StopRoll - Test that StopRoll is only callable by the dice?s owner', async () => {
        //let sr1 = await diceInstance.stopRoll(0, { from: accounts[1] });
        //let sr2 = await diceInstance.stopRoll(1, { from: accounts[2] });

        //truffleAssert.eventEmitted(sr1, 'rolled');
        //truffleAssert.eventEmitted(sr2, 'rolled');

        let tfail = diceInstance.stopRoll(0, { from: accounts[1] });

        try {
            await tfail;
            // assert(false)
        } catch (err) {
            // console.log('err.message:', err.message)
            assert.deepStrictEqual(err.message, "Dice can only be stopped by owner ");
        }

    });


    it('4. Dice Transfer - Test that Transfer is only callable by the dice?s owner', async () => {
        // no await in const, await in try
        let tfail1 = diceInstance.transfer(0, diceMarketInstance.address, { from: accounts[0] });

        try {
            await tfail;
            // assert(false)
        } catch (err) {
            // console.log('err.message:', err.message)
            assert.deepStrictEqual(err.message, "Dice can only be transferred by owner ");
        }


    });

})