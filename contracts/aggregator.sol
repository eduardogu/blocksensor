pragma solidity ^0.5.0;

import './oracle.sol';

contract Aggregator{

   /*Structure used to quickly get oracle parameters
     without having to make multiple function calls*/
   struct OracleStruct{
      address payable contractAddr;
      address payable provider;
      address payable buyer;
      
      string data;
      bool needsUpdate;
      uint lastUpdate;

      string dataType;
      string dataFormat;
      uint updateCost;
      uint earned;
      uint deposited;
      uint updateCycle;
   }

   //Grabs oracle struct based on address
   mapping(address => OracleStruct) public oracleStruct;
   
   //Hash map for user address mapping to contracts owned
   mapping(address => address[]) public contractsOwned;
   //Hash map for user address mapping to contracts taken
   mapping(address => address[]) public contractsTaken;
   //Hash map for contract address to bool, true if
   //contract exists, false if it doesnt
   mapping(address => bool) public contractExists;
   
   //Creates a data contract.
   function createOracle(
      string memory dtype, 
      string memory dformat, 
      uint cost,
      uint cycle
   )public returns(bool success){
      //Creates the oracle structure
      OracleStruct memory os;
      //Creates the contract
      address contractAddr = address(new Oracle(
         address(uint160(address(this))),
         dtype,
         dformat,
         cost,
         cycle
      ));
      //Initiallizes contract structure
      os.contractAddr = address(uint160(address(contractAddr)));
      os.provider = address(uint160(address(msg.sender)));
      os.buyer = address(uint160(address(0)));
      os.data = "";
      os.needsUpdate = false;
      os.lastUpdate = now;
      os.dataType = dtype;
      os.dataFormat = dformat;
      os.updateCost = cost;
      os.earned = 0;
      os.deposited = 0;
      os.updateCycle = cycle;

      //Adds contract to contracts taken
      contractsOwned[msg.sender].push(contractAddr);
      //Adding oracle structure to oracle hash map
      oracleStruct[contractAddr] = os;
      //Setting contract as existing
      contractExists[contractAddr] = true;

      return true;
   }
   //Returns oracle struct based on oracle address
   function getAddressStruct(address oracle)public view returns(
      address contractAddr,
      address provider,
      address buyer,
      string memory data,
      bool needsUpdate,
      uint lastUpdate,
      string memory dataType,
      string memory dataFormat,
      uint updateCost,
      uint earned,
      uint deposited,
      uint updateCycle
   ){
      require(contractExists[oracle]);
      OracleStruct memory os = oracleStruct[oracle];
      contractAddr = os.contractAddr;
      provider = os.provider;
      buyer = os.buyer;
      data = os.data;
      needsUpdate = os.needsUpdate;
      lastUpdate = os.lastUpdate;
      dataType = os.dataType;
      dataFormat = os.dataFormat;
      updateCost = os.updateCost;
      earned = os.earned;
      deposited = os.deposited;
      updateCycle = os.updateCycle;
   }
   //Returns the contractsTaken length of the target
   function getTakenLengthAddr(address target) public view returns(uint length){
      return contractsTaken[target].length;
   }
   //Returns the contractsOwned length of the target
   function getOwnedLengthAddr(address target) public view returns(uint length){
      return contractsOwned[target].length;
   }
   //returns targets contract taken at the given index
   function getContractTakenAddr(address target, uint index) public view returns(address taken){
      if(contractsTaken[target].length <= index)
         return address(0);
      else
         return contractsTaken[target][index];
   }
   //returns target contract owned at the given index
   function getContractOwnedAddr(address target, uint index) public view returns(address owned){
      if(contractsOwned[target].length <= index)
         return address(0);
      else
         return contractsOwned[target][index];
   }
   //Gets the length of contracts taken of the user calling the function
   function getTakenLength() public view returns(uint length){
      return contractsTaken[msg.sender].length;
   }
   //Gets the length of contracts owned of the user calling the function
   function getOwnedLength() public view returns(uint length){
      return contractsOwned[msg.sender].length;
   }
   //Gets the contract taken at the given index of the user calling the function
   function getContractTaken(uint index) public view returns(address taken){
      if(contractsTaken[msg.sender].length <= index)
         return address(0);
      else
         return contractsTaken[msg.sender][index];
   }
   //Gets the contract owned at the given index of the user calling the function
   function getContractOwned(uint index) public view returns(address owned){
      if(contractsOwned[msg.sender].length <= index)
         return address(0);
      else
         return contractsOwned[msg.sender][index];
   }
   
   /* Contract Functions */
   //The user calling the function becomes the contract buyer of the given
   //contract.
   function takeContract(address oracle) public returns(bool success){
      Oracle o; 
      if(!contractExists[oracle])
         return false;
      o = Oracle(address(uint160(oracle)));
      if(!(o.takeContract()))
         return false;
      contractsTaken[msg.sender].push(oracle);
      oracleStruct[oracle].buyer = msg.sender;
      return true;
   }
   //Deposits ether to the given contract.
   function depositTo(address oracle) public payable returns(bool success){
      if(!contractExists[oracle])
         return false;
      oracleStruct[oracle].deposited += msg.value;
      return true;
   }
   //Withdraws the given ether from the given contract, 
   function withdrawFrom(address oracle, uint amount) public returns(bool success){
      if(!contractExists[oracle])
         return false;
      if(!ownsContract(msg.sender, oracle))
         return false;
      if(amount > oracleStruct[oracle].earned)
         return false;
      (msg.sender).transfer(amount);
      oracleStruct[oracle].earned -= amount;
      return true;

   }
   //Updates the data for the contract
   function updateContract(address oracle, string memory data) public returns(bool success){
      Oracle o;
      if(!contractExists[oracle])
         return false;
      if(!ownsContract(msg.sender, oracle))
         return false;
      o = Oracle(address(uint160(oracle)));
      //if(!o.update(data))
         //return false;
      if(oracleStruct[oracle].lastUpdate + oracleStruct[oracle].updateCycle <= now){
         oracleStruct[oracle].earned += oracleStruct[oracle].updateCost;
         oracleStruct[oracle].deposited -= oracleStruct[oracle].updateCost;
      }
      oracleStruct[oracle].data = data;
      oracleStruct[oracle].lastUpdate = now;
      return true;
   }
   function requestContract(address payable oracle) public returns(bool success){
      Oracle o;
      if(!contractExists[oracle])
         return false;
      if(!takenContract(msg.sender, oracle))
         return false;
      o = Oracle(oracle);
      return o.request();
   }
   function endSell(address oracle) public returns(bool success){
      Oracle o;
      if(!contractExists[oracle])
         return false;
      if(!ownsContract(msg.sender, oracle))
         return false;
      o = Oracle(address(uint160(oracle)));
      if(!o.endSell(msg.sender))
         return false;
      oracleStruct[oracle].provider = address(0);
      removeContractOwned(address(uint160(oracle)));
      return true;
   }
   function endBuy(address oracle) public returns(bool success){
      Oracle o;
      if(!contractExists[oracle])
         return false;
      if(!takenContract(msg.sender, oracle))
         return false;
      o = Oracle(address(uint160(oracle)));
      if(!o.endBuy(msg.sender))
         return false;
      oracleStruct[oracle].buyer = address(0);
      removeContractTaken(address(uint160(oracle)));
      return true;
   }

   /* Contract Parameter Edits */
   function setType(address payable oracle, string memory dtype) public returns (bool success){
      Oracle o;
      if(!contractExists[oracle])
         return false;
      if(!ownsContract(msg.sender, oracle))
         return false;
      o = Oracle(oracle);
      if(!o.setType(dtype))
         return false;
      oracleStruct[oracle].dataType = dtype;
      return true;
   }
   function setFormat(address payable oracle, string memory format) public returns (bool success){
      Oracle o;
      if(!contractExists[oracle])
         return false;
      if(!ownsContract(msg.sender, oracle))
         return false;
      o = Oracle(oracle);
      if(!o.setFormat(format))
         return false;
      oracleStruct[oracle].dataFormat = format;
      return true;
   }
   function setCycle(address payable oracle, uint cycle) public returns(bool success){
      Oracle o;
      if(!contractExists[oracle])
         return false;
      if(!ownsContract(msg.sender, oracle))
         return false;
      o = Oracle(oracle);
      if(!o.setCycle(cycle))
         return false;
      oracleStruct[oracle].updateCycle = cycle;
      return true;
   }
   function setCost(address payable oracle, uint cost) public returns(bool success){
      Oracle o;
      if(!contractExists[oracle])
         return false;
      if(!ownsContract(msg.sender, oracle))
         return false;
      o = Oracle(oracle);
      if(!o.setCost(cost))
         return false;
      oracleStruct[oracle].updateCost = cost;
      return true;
   }
   
   /*Internal Functions */
   function removeContractTaken(address payable oracle) internal returns(bool success){
      uint length = contractsTaken[msg.sender].length;
      uint i = 0;
      if(length <= 0)
         return false;
      for(i = 0; i < length; ++i){
         if(contractsTaken[msg.sender][i] == oracle){
            if(i != length - 1)
               contractsTaken[msg.sender][i] = contractsTaken[msg.sender][length - 1];
            --(contractsTaken[msg.sender].length);
            //getDeposit
            //return deposit to msg.sender
            return true;
         }
      }
      return false;
   }
   function removeContractOwned(address payable oracle) internal returns(bool success){
      uint length = contractsOwned[msg.sender].length;
      uint i = 0;
      if(length <= 0)
         return false;
      for(i = 0; i < length; ++i){
         if(contractsOwned[msg.sender][i] == oracle){
            if(i != length - 1)
               contractsOwned[msg.sender][i] = contractsOwned[msg.sender][length - 1];
            --(contractsOwned[msg.sender].length);
            return true;
         }
      }
      return false;
   }
   function takenContract(address buyer, address oracle) internal view returns(bool success){
      uint length = contractsTaken[buyer].length;
      uint i = 0;
      if(contractsTaken[buyer].length <= 0)
         return false;
      for(i = 0; i < length; ++i){
         if(contractsTaken[buyer][i] == oracle)
            return true;
      }
      return false;
   }
   function ownsContract(address owner, address oracle) internal view returns(bool success){
      uint length = contractsOwned[owner].length;
      uint i = 0;
      if(contractsOwned[owner].length <= 0)
         return false;
      for(i = 0; i < length; ++i){
         if(contractsOwned[owner][i] == oracle)
            return true;
      }
      return false;
   }
}
