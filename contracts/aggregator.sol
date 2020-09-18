pragma solidity ^0.5.0;

import './sensor.sol';

contract Aggregator{

   mapping(address => address[]) public sensorsOwned;
   mapping(uint => address[]) public zipcodeSensors;
   mapping(uint => uint) public zipcodePrice;
   address aggregator = address(this);

   function createSensor(uint zip) public returns(bool success){
      address s = address(new Sensor(
         msg.sender,
         aggregator,
         zip
      ));
      sensorsOwned[msg.sender].push(s);
      zipcodeSensors[zip].push(s);
      return true;
   }

   function pollZip(uint zip) public returns(uint t){
      
      uint temp = 0;
      uint i;
      Sensor s;

      for(i = 0; i < zipcodeSensors[zip].length; ++i){
         s = Sensor(zipcodeSensors[zip][i]);
         temp += s.pollData();
      }
      if(i > 0)
         temp = temp/i;
      return temp;
   }
}
