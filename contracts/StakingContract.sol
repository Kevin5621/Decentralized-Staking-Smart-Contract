// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingContract is Ownable {
    IERC20 public StakingToken;
    uint256 public totalStaked;
    uint256 public totalRewards;

    struct Staker {
        uint256 amount;
        uint256 stakingTime;
    }

    mapping(address => Staker) public Stakers;

    constructor(IERC20 _stakingToken, uint256 _rewardRate) {
        StakingToken = _stakingToken;
        rewardRate = _rewardRate;
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than zero");

        StakingToken.transferFrom(msg.sender, address(this), _amount);

        if  (Stakers[msg.sender].amount > 0) {
            uint256 reward = calculateReward(msg.sender);
            stakinToken.transfer(msg.sender, reward);
        }

        Stakers[msg.sender].amount += _amount;
        stakers[msg.sender].stakingTime = block.timestamp;
        totalStaked += _amount;
    }

    function calculateReward(address _staker) public view returns (uint256) {
        Staker memory staker = stakers[_staker];
        uint256 stakingDuration = block.timestamp - staker.stakingTime;
        return  (stakingDuration * rewardRate) / 1 days;
    }

    function withdraw(uint256 _amount) public {
        require(stakers[msg.sender].amount >= _amount, "Insufficient staked amount");

        uint256 reward  = calculateReward(msg.sender);
        stakingToken.transfer(msg.sender, reward);

        stakers[msg.sender].amount -= _amount;
        stakingToken.transfer(msg.sender, _amount);
        totalStaked -= _amount;
    }
}