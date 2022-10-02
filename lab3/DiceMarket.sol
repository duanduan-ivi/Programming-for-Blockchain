pragma solidity ^0.5.0;
import "./Dice.sol";

contract DiceMarket {
    
    Dice diceContract;
    uint256 public commissionFee;
    
    address _owner = msg.sender;
    
    mapping(uint256 => uint256) listPrice;
      constructor(Dice diceAddress, uint256 fee) public {
        diceContract = diceAddress;
        commissionFee = fee;
    }
    
    // list a dice for sale, price needs to be >= value + fee
    function list(uint256 id, uint256 price) public {
       require(msg.sender == diceContract.getPrevOwner(id));
       listPrice[id] = price;
    }
    
    function unlist(uint256 id) public {
        require(listPrice[id] != 0); // is listed
        require(msg.sender == diceContract.getPrevOwner(id));
        listPrice[id] = 0;
    }

    // get price of dice
    function checkPrice(uint256 id) public view returns (uint256) {
        return listPrice[id];
    }


    // buy the dice
    function buy(uint256 id) public payable {
        require(listPrice[id] != 0); // is listed
        require(msg.value >= (listPrice[id] + commissionFee)); // offered price meets minimum ask

        address payable recipient = address(uint160(diceContract.getPrevOwner(id)));
        recipient.transfer(msg.value - commissionFee); // transfer (price-commissionFee) to real owner
        diceContract.transfer(id, msg.sender);
    }

}