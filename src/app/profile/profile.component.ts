import { Component, OnInit } from '@angular/core';
import { TransferService } from '../services/transfer.service';

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.scss'],
   providers: [TransferService]  
})
export class ProfileComponent implements OnInit {
  web3: any;

  user = {
      address: '',
      balance: '',
      remarks: ''
  };
  
  emptyAddr = "0x0000000000000000000000000000000000000000";
  contractsTaken = [];
  contractsOwned = [];
  takenPage = 0;
  ownedPage = 0;
  contractsTakenLength = 0;
  contractsOwnedLength = 0; 

  constructor(private transferService: TransferService) { 
  }

  ngOnInit() {
     this.user.address = '';
     this.user.balance = '';
     this.user.remarks = '';
     this.getAccountAndBalance();
     this.getContractsOwned(0);
     this.getContractsTaken(0);
  }
  
  getAccountAndBalance = () => {
     const that = this; 
     this.transferService.getUserBalance().then(function(retAccount: any){
         that.user.address = retAccount.account;
         that.user.balance = retAccount.balance;
         that.user.balance = that.transferService.web3.utils.fromWei(retAccount.balance, 'ether');
         console.log('transfer.components :: getAccountAndBalance :: that.user');
         console.log(that.user);
     }).catch(function(error){
        console.log(error);
     });
   }
  getContractsTaken = (page: number) => {
     const that = this;
     console.log('profile component :: getContractsTakenLength');
     this.transferService.getContractsTakenLength().then(function(retVal: any){
         console.log('profile component :: getContractsTakenLength :: length');
         console.log('Contracts taken: ' + retVal);
         that.contractsTakenLength = retVal;
         for(var i = 0; i < that.contractsTakenLength; ++i){
            that.transferService.getContractTaken(page + i).then(function(retVal: any){
               console.log('profile component :: getContractTaken');
               console.log('Contract addr: ' + retVal);
               that.transferService.getOracleStruct(retVal).then(function(retVal: any){
                  console.log('profile component :: getContractTaken :: getOracleStruct');
                  console.log('Struct: ' + JSON.stringify(retVal));
                  that.contractsTaken.push(
                     {
                        contractAddr: retVal[0],
                        provider: retVal[1],
                        buyer: retVal[2],
                        data: retVal[3],
                        needsUpdate: retVal[4],
                        lastUpdate: retVal[5],
                        dataType: retVal[6],
                        dataFormat: retVal[7],
                        updateCost: retVal[8],
                        earned: retVal[9],
                        deposited: retVal[10],
                        updateCycle: retVal[11]
                     }
                  );
               }).catch(function(error){
                  console.log(error);
               });
            }).catch(function(error){
               console.log(error);
            });
         }
     }).catch(function(error){
         console.log(error);
     });
  }
  getContractsOwned = (page: number) => {
     const that = this;
     this.transferService.getContractsOwnedLength().then(function(retVal: any){
         console.log('profile component :: getContractsOwnedLength :: length');
         console.log('Contracts owned: ' + retVal);
         that.contractsOwnedLength = retVal;
         for(var i = 0; i < that.contractsOwnedLength; ++i){
             that.transferService.getContractOwned(that.ownedPage + i).then(function(retVal: string){
                 console.log('profile component :: getContractOwned');
                 console.log('Contract addr: ' + retVal);
                 that.transferService.getOracleStruct(retVal).then(function(retVal: any){
                    console.log('profile component :: getContractsOwned :: getOracleStruct');
                    console.log('Struct: ' + JSON.stringify(retVal));
                    that.contractsOwned.push(
                        {
                            contractAddr: retVal[0],
                            provider: retVal[1],
                            buyer: retVal[2],
                            data: retVal[3],
                            needsUpdate: retVal[4],
                            lastUpdate: retVal[5],
                            dataType: retVal[6],
                            dataFormat: retVal[7],
                            updateCost: retVal[8],
                            earned: retVal[9],
                            deposited: retVal[10],
                            updateCycle: retVal[11]
                        }
                    );
                 }).catch(function(error){
                    console.log(error);
                 });
             }).catch(function(error){
                 console.log(error);
             });
         }
     }).catch(function(error){
         console.log(error);
     });
     
  }
  
  

}
