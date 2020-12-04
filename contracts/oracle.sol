pragma solidity ^0.5.0;

contract Oracle{
   
   //The Contract creator
   address payable public provider;
   //The contract buyer
   address payable public buyer;
   
   //Contract data updated by provider
   string public data;
   //Keeps track of the last instance when data was updated
   uint public lastUpdate;
   //Keeps track of the contracts status
   enum Status { Available, Active, Paused, Ended }
   Status status;

   //Contract data information
   string public dataType;
   string public dataFormat;

   //Sets the parameters for the contract
   uint public updateCost;  //ether
   uint public earned;      //ether
   uint public deposited;   //ether
   uint public updateCycle; //seconds
   
   /*The constructor creates an oracle contract and
     deploys it to the blockchain. */
   constructor(
      address payable owner,
      string memory dtype,
      string memory dformat,
      uint cost,
      uint cycle
   )public{
      provider = owner;
      dataType = dtype;
      dataFormat = dformat;
      updateCost = cost;
      updateCycle = cycle;
      status = Status.Available;
      data = "";
      deposited = 0;
      earned = 0;
   }
   /*Allows users to take a contract, and lets them use the 
     contract taker specific function calls, returns true
     on successful contract acceptance.*/
   function takeContract() public returns(bool success){
      /*Makes sure the contract is available for taking*/
      if(status == Status.Available){
         buyer = msg.sender;
         status = Status.Active;
         return true;
      }
      return false;
   }
   /*Allows the contract creator to update the data.  Pays
     the contract creator in Ether when its update after an 
     update cylce */
   function update(string memory newData) public returns(bool success){
      if((msg.sender != provider))
         return false;
      if(now >= lastUpdate + updateCycle){
         if(deposited < updateCost)
            return false;
         deposited -= updateCost;
         earned += updateCost;
      }
      data = newData;
      lastUpdate = now;
      return true;
   }
   function request() public returns(bool success){
      if((msg.sender != buyer)||(deposited < updateCost))
         return false;
      return true;
   }
   /*Provider call that ends the contract*/
   function endSell() public returns(bool success){   
      /*Only callable by contract creator*/   
      if((msg.sender != provider))
         return false;
      }
      /*Withdraws all earned Ether */
      buyer.transfer(earned);
      earned = 0;
      status = Status.Ended;
      return true;
   }
   /*Ends the contract acceptance*/
   function endBuy(address proxy) public returns(bool success){
      /*Only callable by contract buyer*/
      if(msg.sender != buyer)
         return false;
      buyer.transfer(deposited);
      deposited = 0;
      status = Status.Ended;
      return true;
   }

   //Contract Mutators
   //Changes the contract parameters, callable only by the contract Creator
   function setType(string memory dtype) public returns(bool success){
      if((msg.sender != provider)&&(deposited > 0))
         return false;
      dataType = dtype;
      return true;
   }
   function setFormat(string memory format) public returns(bool success){
      if((msg.sender != provider)&&(deposited > 0))
         return false;
      dataFormat = format;
      return true;
   }
   function setCycle(uint cycle) public returns(bool success){
      if((msg.sender != provider)&&(deposited > 0))
         return false;
      updateCycle = cycle;
      return true;
   }
   function setCost(uint cost) public returns(bool success){
      if((msg.sender != provider)&&(deposited > 0))
         return false;
      updateCost = cost;
      return true;
   }

   //Allows users to deposit ether to the contract */
   function deposit() public payable{
      deposited += msg.value;
   }
   function() external payable{
      deposited += msg.value;
   }

}
