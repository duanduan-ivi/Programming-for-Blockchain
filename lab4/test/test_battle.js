const truffleAssert = require('truffle-assertions');
const web3 = require("web3");



contract('DiceBattle', function (accounts) {
    let Dice = artifacts.require("../contracts/Dice.sol");
    let DiceBattle = artifacts.require("../contracts/DiceBattle.sol");

    before(async () => {
        diceInstance = await Dice.deployed();
        diceBattleInstance = await DiceBattle.deployed();
        await diceInstance.add(2, 22, { from: accounts[0], value: web3.utils.toWei('0.1', "ether") });
        await diceInstance.add(2, 33, { from: accounts[1], value: web3.utils.toWei('0.1', "ether") });
        await diceInstance.transfer(0, diceBattleInstance.address, { from: accounts[0] });
        await diceInstance.transfer(1, diceBattleInstance.address, { from: accounts[1] });
    });


    it('5. Only the original owner of the myDice is able to trigger the battle', async () => {
        let rsl = await diceBattleInstance
            .battle(0, 1, { from: accounts[0] })
            .catch((rsl) => {
                assert.fail("function 'battle' failed " + rsl);
            });

        //let battle = await diceBattleInstance.add(0, 1, { from: accounts[0] });

        //try {
        //    await battle;
        //    // assert(false)
        //} catch (err) {
        //    // console.log('err.message:', err.message)
        //    assert.fail("function 'battle' failed " + err);
        //}
    });
})