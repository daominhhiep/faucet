pragma solidity >=0.4.22 <0.9.0;

contract Faucet {
    uint256 public numOfFunders;
    mapping(uint256 => address) public lutFunders;
    mapping(address => bool) public funders;

    receive() external payable {}

    //AddFunds
    function addFunds() external payable {
        address funder = msg.sender;
        if (!funders[funder]) {
            uint256 index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    //getFundersIndex
    function getFundersIndex(uint256 index) external view returns (address) {
        return lutFunders[index];
    }

    //getAllFunders
    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);
        for (uint256 i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }

    //withdraw
    function withdraw(uint256 withdrawAmount) external limitWithdraw(withdrawAmount) {
       payable(msg.sender).transfer(withdrawAmount);
    }

    modifier limitWithdraw(uint256 withdrawAmount) {
       require(withdrawAmount <= 1*(10**18), "Withdraw amount is too large");
        _;
    }

}
