const Dice = artifacts.require("Dice");
const DiceBattle = artifacts.require("DiceBattle");
const DiceMarket = artifacts.require("DiceMarket");

module.exports = function (deployer) {
    deployer.deploy(Dice)
        .then(function () {
            return deployer.deploy(DiceBattle, Dice.address);
        })
        .then(function () {
            return deployer.deploy(DiceMarket, Dice.address, 2);
        })
};