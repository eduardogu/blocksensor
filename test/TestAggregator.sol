pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/aggregator.sol";

contract TestAggregator{
   Aggregator a = Aggregator(DeployedAddresses.Aggregator());

   function testUserCanCreateSensor() public {
      bool result = a.createSensor(93930);
      uint avg = 0;
      Assert.isTrue(result, "Sensor created.");
      a.pollZip(93930);
      Assert.isZero(avg, "Avg is 0");
   }
}

