pragma solidity ^0.5.0;

contract Sensor {

   address dataProvider;
   address dataAggregator;

   uint public zipcode;
   uint public temperature;

   constructor(
      address provider,
      address aggregator,
      uint zip
   )public{
      dataProvider = provider;
      dataAggregator = aggregator;
      zipcode = zip;
      temperature = 0;
   }

   function setData(uint temp) public returns(bool success){
      if(msg.sender == dataProvider){
         temperature = temp;
         return true;
      }
      return false;
   }

   function pollData() public returns(uint temp){
      if(msg.sender == dataAggregator)
         return temperature;
      else
         return 0;
   }
}
