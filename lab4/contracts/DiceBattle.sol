// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Dice.sol";

contract DiceBattle {

    Dice diceContract;

    constructor(Dice diceAddress) {
        diceContract = diceAddress;
    }

    event battlewin(uint256 myDice,uint256 enemyDice);
    event battleDraw(uint256 myDice,uint256 enemyDice);

    function battle(uint256 myDice, uint256 enemyDice) public {
        require(diceContract.getOwner(myDice) == address(this));
        require(diceContract.getOwner(enemyDice) == address(this));
        require(diceContract.getPrevOwner(myDice) == msg.sender);

        diceContract.roll(myDice);
        diceContract.stopRoll(myDice);
        diceContract.roll(enemyDice);
        diceContract.stopRoll(enemyDice);

      if ( diceContract.getDiceNumber(myDice) > diceContract.getDiceNumber(enemyDice) ) {
          diceContract.transfer(myDice,diceContract.getPrevOwner(enemyDice)); //last owner before sending to DiceBattle
          diceContract.transfer(enemyDice,diceContract.getPrevOwner(enemyDice));
          emit battlewin(myDice,enemyDice);
      }
     if ( diceContract.getDiceNumber(myDice) < diceContract.getDiceNumber(enemyDice) ) {
          diceContract.transfer(enemyDice,diceContract.getPrevOwner(myDice)); //last owner before sending to DiceBattle
          diceContract.transfer(myDice,diceContract.getPrevOwner(myDice));
          emit battlewin(enemyDice,myDice);
      }
      if ( diceContract.getDiceNumber(myDice) == diceContract.getDiceNumber(enemyDice) ) {
          emit battleDraw(myDice,enemyDice);
      }
    }

    function getDiceOwner(uint256 id) public view  returns (address){
        return diceContract.getPrevOwner(id);
    }

    function getDiceNumber (uint256 diceId) public view returns (uint256) {
        return diceContract.getDiceNumber(diceId);
    }

}
