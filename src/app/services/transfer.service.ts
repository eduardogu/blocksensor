import { Injectable } from '@angular/core';
const Web3 = require('web3');

declare let require: any;
declare let window: any;
const tokenAbi = require('../../../build/contracts/Aggregator.json');

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private account: any = null;
  public readonly web3: any;
  private enable: any;

  constructor() { 
      if(window.ethereum === undefined){
         alert('Non-Ethereum browser detected.  Install MetaMask');
      }
      else{
         if(typeof window.web3 !== 'undefined'){
            this.web3 = window.web3.currentProvider;
         }
         else{
            this.web3 = new Web3.providers.HttpProvider('http://localhost:7545');
         }
         console.log('transfer.service :: constructor :: window.ethereum');
         window.web3 = new Web3(window.ethereum);
         console.log('transfer.service :: constructor :: this.web3');
         console.log(this.web3);
         this.enable = this.enableMetaMaskAccount();
      }
  }
  private async enableMetaMaskAccount(): Promise<any> {
     let enable = false;
     await new Promise((resolve, reject) => {
        enable = window.ethereum.enable();
     });
     return Promise.resolve(enable);
  }
  public async getAccount(): Promise<any> {
     console.log('transfer.service :: getAccount :: start');
     if(this.account == null){
        this.account = await new Promise((resolve, reject) => {
           console.log('transfer.service :: getAccount :: eth');
           console.log(window.web3.eth);
           window.web3.eth.getAccounts((err, retAccount) => {
              console.log('transfer.service :: getAccount :: retAccount');
              console.log(retAccount);
              if(retAccount.length > 0){
                 this.account = retAccount[0];
                 resolve(this.account);
              }else{
                 alert('transfer.service :: getAccount :: no accounts found.');
                 reject('No accounts found.');
              }
              if(err != null){
                 alert('transfer.service :: getAccount :: error retrieving account');
                 reject('Error retrieving account');
              }
           });
        }) as Promise<any>;
     }
     return Promise.resolve(this.account);
  }
  public async getUserBalance(): Promise<any>{
      const account = await this.getAccount();
      console.log('transfer.service :: getUserBalance :: account');
      console.log(account);
      return new Promise((resolve, reject) => {
         window.web3.eth.getBalance(account, function(err, balance){
            console.log('transfer.service :: getUserBalance :: getBalance');
            console.log(balance);
            if(!err){
               const retVal = {
                  account: account,
                  balance: balance
               };
               console.log('transfer.service :: getUserBalance :: getBalance :: retVal');
               console.log(retVal);
               resolve(retVal);
            } else{
               reject({account: 'error', balance: 0});
            }
         });
      }) as Promise<any>;
  }
  public async takeContract(addr: string): Promise<any>{
      const account = await this.getAccount();
      console.log('transfer.service :: takeContract');
      return new Promise((resolve, reject)  => {
         console.log('tranfser.service :: takeContract :: tokenAbi');
         console.log(tokenAbi);
         const contract = require('@truffle/contract');
         const transferContract = contract(tokenAbi);
         transferContract.setProvider(this.web3);
         transferContract.deployed().then(function(instance){ 
            const retVal = instance.takeContract(
               addr,
               {from: account}
            );
            resolve(retVal);
         }).catch(function(error){
            console.log(error);
            return reject('transfer.service.error');
         });
      }).catch(function(error){
         console.log(error);
      });
   }
  public async createOracle(oracle){
      const account = await this.getAccount();
      console.log('transfer.service :: createOracle ');
      return new Promise((resolve, reject) => {
         console.log('transfer.service :: createOracle :: tokenAbi');
         console.log(tokenAbi);
         const contract = require('@truffle/contract');
         const transferContract = contract(tokenAbi);
         transferContract.setProvider(this.web3);
         console.log('transfer.service :: createOracle :: transferContract');
         console.log(transferContract);
         transferContract.deployed().then(function(instance){
            return instance.createOracle(
               oracle.dataType,
               oracle.dataFormat,
               oracle.updateCost,
               oracle.updateCycle,
               {from: account}
            );
         }).then(function(status){
            if(status){
               return resolve({status: true});
            }
         }).catch(function(error){
            console.log(error);
            return reject('transfer.service error');
         });
      });
  }
  public async depositEther(addr: string, amount: number): Promise<any>{
      const account = await this.getAccount();
      console.log('transfer.service :: depositEther');
      return new Promise((resolve, reject) => {
         const contract = require('@truffle/contract');
         const transferContract = contract(tokenAbi);
         transferContract.setProvider(this.web3);
         transferContract.deployed().then(function(instance){
            const retVal = instance.depositTo(
               addr,
               {
                  from: account,
                  value: amount
               }
            );
            resolve(retVal);
         }).catch(function(error){
            console.log(error);
         });
      }).catch(function(error){
         console.log(error);
      });
  }
  public async getContractsTakenLength(): Promise<any>{
     const account = await this.getAccount();
     console.log('transfer.service :: gentContractsTaken');
     return new Promise((resolve, reject) => {
         const contract = require('@truffle/contract');
         const transferContract = contract(tokenAbi);
         transferContract.setProvider(this.web3);
         transferContract.deployed().then(function(instance){
            const length = instance.getTakenLength({from: account});
            console.log(length);
            resolve(length);
         }).catch(function(error){
            console.log(error);
            return reject('transfer.service error');
         });
     });
  }
  public async getContractsOwnedLength(): Promise<any>{
      const account = await this.getAccount();
      console.log('transfer.service :: getContractsOwned');
      return new Promise((resolve, reject) => {
         const contract = require('@truffle/contract');
         const transferContract = contract(tokenAbi);
         transferContract.setProvider(this.web3);
         transferContract.deployed().then(function(instance){
            const length = instance.getOwnedLength({from: account});
            console.log(length);
            resolve(length);
         }).catch(function(error){
            console.log(error);
            return reject('transfer.service error');
         });
      });
  }
  public async getContractsOwnedLengthAddr(addr: string): Promise<any>{
     const account = await this.getAccount();
     console.log('transfer.service :: getContractsOwnedLengthAddr');
     return new Promise((resolve, reject) => {
        const contract = require('@truffle/contract');
        const transferContract = contract(tokenAbi);
        transferContract.setProvider(this.web3);
        transferContract.deployed().then(function(instance){
           const length = instance.getOwnedLengthAddr(
              addr,
              {from: account}
           )
           resolve(length);
        }).catch(function(error){
           console.log(error);
           return reject('transfer.service error');
        });
     });
  }
  public async getContractOwned(index: number): Promise<any>{
     const length = await this.getContractsOwnedLength();
     const account = await this.getAccount();
     console.log('transfer.service :: getContractsOwned');
     return new Promise((resolve, reject) => {
        const contract = require('@truffle/contract');
        const transferContract = contract(tokenAbi);
        transferContract.setProvider(this.web3);
        transferContract.deployed().then(function(instance){
            console.log('length: ' + length);
            if(index >= length){
              console.log(index + ' is greater than or equal to ' + length);
              reject('0x0');
            }
            console.log('Index: ' + index)
            const addr = instance.getContractOwned(
               index,
               {from: account}
            );
           console.log('addr: ' + addr);
           resolve(addr);
        }).catch(function(error){
            console.log(error);
            return reject('transfer.service error');
        });
     });
  }
  public async getContractOwnedAddr(index: number, addr: string): Promise<any>{
     const length = await this.getContractsOwnedLengthAddr(addr);
     const account = await this.getAccount();
     console.log('transfer.service :: getContractsOwned');
     return new Promise((resolve, reject) => {
        const contract = require('@truffle/contract');
        const transferContract = contract(tokenAbi);
        transferContract.setProvider(this.web3);
        transferContract.deployed().then(function(instance){
            console.log('length: ' + length);
            if(index >= length){
              console.log(index + ' is greater than or equal to ' + length);
              reject('0x0');
            }
            console.log('Index: ' + index)
            const contractAddr = instance.getContractOwnedAddr(
               addr,
               index,
               {from: account}
            );
           console.log('addr: ' + contractAddr);
           resolve(contractAddr);
        }).catch(function(error){
            console.log(error);
            return reject('transfer.service error');
        });
     });
  }
  
  
   public async getContractTaken(index: number): Promise<any>{
     const length = await this.getContractsTakenLength();
     const account = await this.getAccount();
     console.log('transfer.service :: getContractsOwned');
     return new Promise((resolve, reject) => {
        const contract = require('@truffle/contract');
        const transferContract = contract(tokenAbi);
        transferContract.setProvider(this.web3);
        transferContract.deployed().then(function(instance){
            console.log('length: ' + length);
            if(index >= length){
              console.log(index + ' is greater than or equal to ' + length);
              reject('0x0');
            }
            console.log('Index: ' + index)
            const addr = instance.getContractTaken(
               index,
               {from: account}
            );
           console.log('addr: ' + addr);
           resolve(addr);
        }).catch(function(error){
            console.log(error);
            return reject('transfer.service error');
        });
     });
  }
   public async getOracleStruct(contractAddr: string): Promise<any>{
     const account = await this.getAccount();
     console.log("Passing in: " + contractAddr);
     console.log('transfer.service :: getOracleStruct');
     return new Promise((resolve, reject) => {
        const contract = require('@truffle/contract');
        const transferContract = contract(tokenAbi);
        transferContract.setProvider(this.web3);
        transferContract.deployed().then(function(instance){
            const retVal = instance.getAddressStruct(
               contractAddr,
               {from: account} 
            );
            resolve(retVal);
        }).catch(function(error){
            console.log(error);
            return reject('transfer.service error');
        });
     });
  }
  public async updateContract(contractAddr: string, data: string): Promise<any>{
      const account = await this.getAccount();
      console.log("To: " + contractAddr);
      console.log("Passing in: " + data);
      console.log("transfer.service :: updateContract");
      return new Promise((resolve, reject) => {
         const contract = require('@truffle/contract');
         const transferContract = contract(tokenAbi);
         transferContract.setProvider(this.web3);
         transferContract.deployed().then(function(instance){
            const retVal = instance.updateContract(
               contractAddr,
               data,
               {from: account}
            );
            resolve(retVal);
         }).catch(function(error){
            console.log(error);
            return reject('transfer.service error');
         });
      });
  }
   
}
