pragma solidity ^0.5.0;

import "./ERC20.sol";


contract DiceToken {

    ERC20 erc20Contract;
    uint256 supplyLimit;
    uint256 currentSupply;
    address owner;

    constructor() public {
        // every deployment of DiceToken will create its own ERC20 instance, no separate deploy of ERC20 
        ERC20 e = new ERC20();
        erc20Contract = e;
        owner = msg.sender;
        supplyLimit = 10000;
    }


    function getCredit() public payable {
        uint256 amt = msg.value / 10000000000000000;
        require(erc20Contract.totalSupply() + amt < supplyLimit, "DT supply is not enough");
        erc20Contract.mint(msg.sender, amt);
    }

    function checkCredit() public view returns(uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }


    function diceTokenTransferFrom(address _from, address _spender, address _to, uint256 _value) public {
        erc20Contract.diceTokenTransferFrom(_from, _spender, _to, _value);
    }

    function transfer(address _to, uint256 _value) public {
        erc20Contract.transfer(_to, _value);
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        erc20Contract.approve(_spender, _value);
    }

    function diceTokenApprove(address _owner, address _spender, uint256 _value) public returns (bool) {
        erc20Contract.diceTokenApprove(_owner ,_spender, _value);
    }

    function checkAllowance(address _owner, address _spender) public view returns (uint256) {
        erc20Contract.allowance(_owner, _spender);
    }

}