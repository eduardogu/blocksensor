pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/aggregator.sol";

contract TestAggregator{
   Aggregator a = Aggregator(DeployedAddresses.Aggregator());
   uint public initialBalance = 1 ether;
   uint public currentBalance = initialBalance;
   string dtype = "Temperature";
   string dformat = "JSON";
   uint cost = 1000;
   uint cycle = 3600;
   uint length;
   Oracle oracle;
   address o;
   bool result = a.createOracle(
      dtype,
      dformat,
      cost,
      cycle
   );

   function testUserCanCreateSensor() public {
      Assert.isTrue(result, "Sensor created.");
      length = a.getOwnedLength();
      Assert.equal(length, 1, "One Contract added");
      o = a.getContractOwned(length - 1);
      oracle = Oracle(address(uint160(o)));
      Assert.equal(oracle.dataType(), dtype, "Validating DataType");
      Assert.equal(oracle.dataFormat(), dformat, "Validating DataFormat");
      Assert.equal(oracle.updateCost(), cost, "Validating Cost");
      Assert.equal(oracle.updateCycle(), cycle, "Validating Cycle");
      Assert.equal(oracle.data(), "", "Validating default data");

   }
   function testUserCanTakeContract() public {
      Assert.isTrue(a.takeContract(address(uint160(o))), "contract taken");
      Assert.equal(a.getTakenLength(), 1, "Contract added to taken array");
      Assert.equal(a.getContractTaken(length - 1), address(oracle), "Oracle exists taken");
      Assert.equal(oracle.buyer(), address(a), "buyer updated");
   }
   function testUserCanSendEther() public {
      oracle.deposit.value(10000)();
      currentBalance -= 10000;
      Assert.equal(oracle.deposited(), 10000, "balance increase");
   }
   function testUserCanRequest() public {
      Assert.isTrue(a.requestContract(address(uint160(o))), "requestContract");
   }
   function testUserCanUpdateContract() public {
      Assert.isTrue(a.updateContract(address(uint160(o)), "update"), "updateContract");
      Assert.equal(oracle.data(), "update", "Data is updated");
   }
   function testUserCanEndBuy() public {
      Assert.equal(a.getTakenLength(), 1, "Agreggator has taken contract");
      Assert.isTrue(a.endBuy(address(uint160(o))), "endBuy");
      Assert.equal(a.getTakenLength(), 0, "Ended buy");  
   }
   function testUserCanChangeDataType() public {
      Assert.isTrue(a.setType(address(uint160(o)), "Pressure"), "Set type");
      Assert.equal(oracle.dataType(), "Pressure", "Data type is set");
   }
   function testUserCanChangeDataFormat() public {
      Assert.isTrue(a.setFormat(address(uint160(o)), "XML"), "Set format");
      Assert.equal(oracle.dataFormat(), "XML", "Format is set");
   }
   function testUserCanChangeCycle() public {
      Assert.isTrue(a.setCycle(address(uint160(o)), 300), "Set cycle");
      Assert.equal(oracle.updateCycle(), 300, "Cycles have been set");
   }
   function testUserCanChangeCost() public {
      Assert.isTrue(a.setCost(address(uint160(o)), 1200), "Set cost");
      Assert.equal(oracle.updateCost(), 1200, "Cost has been set");
   }
   function testUserCanEndSell() public {
      Assert.equal(a.getOwnedLength(), 1, "Aggreggator has owned contract");
      Assert.isTrue(a.endSell(address(uint160(o))), "endSell");
      Assert.equal(a.getOwnedLength(), 0, "Ended sell");
   }
   function () external payable{
      currentBalance += msg.value;
   }
}







