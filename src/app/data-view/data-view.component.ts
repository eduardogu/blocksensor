import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../interfaces/sensor';
import { TransferService } from '../services/transfer.service';
import { SENSORS } from '../../interfaces/mock-sensors';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  providers: [TransferService]
})
export class DataViewComponent implements OnInit {

  sensors = SENSORS;
  contracts = [];
  userAddress = "";
  emptyAddress = "0x0000000000000000000000000000000000000000"
  constructor(private transferService: TransferService){ 
  }
  ngOnInit() {
     var filter = document.getElementById("filter-modal");
     var search = document.getElementById("search-modal");
     
     this.getAccount();
     search.style.display = "none";
     filter.style.display = "none";
  }
  public openFilter(){
     var filter = document.getElementById("filter-modal");
     var option = document.getElementById("filter-option");

     if(filter.style.display == "none"){
        filter.style.display = "block";
        filter.style.opacity = "1";
        option.style.backgroundColor = "white";
        option.style.color = "#ff9e00";
     }
     else{
        filter.style.display = "none";
        filter.style.display = "0";
        option.style.color = "#000000";
        option.style.backgroundColor = "#dcdcdc";
     }
  }
  public openSearch(){
     var search = document.getElementById("search-modal");
     var option = document.getElementById("search-option");

     if(search.style.display == "none"){
        search.style.display = "block";
        search.style.opacity = "1";
        option.style.backgroundColor = "white";
        option.style.color = "#ff9e00";
     }
     else{
        search.style.display = "none";
        search.style.display = "0";
        option.style.color = "#000000";
        option.style.backgroundColor = "#dcdcdc";
     }
  }
  public getContracts(){
     var owner = (<HTMLInputElement>document.getElementById("contract-owner")).value;
     var buyer = (<HTMLInputElement>document.getElementById("contract-buyer")).value;
     if(((owner == "")&&(buyer != ""))||(owner != "")&&(buyer == "")){
        if(owner != "")
           this.getContractsOwned(owner);
        else
           this.getContractsOwned(buyer);
        return
     }
     console.log("Owner: " + owner);
     console.log("Buyer: " + buyer);
  }
  public takeContract(contractAddr: any){
      const that = this;
      console.log('Hopefully taking contract: ' + contractAddr);
      this.transferService.takeContract(contractAddr).then(function(retVal: number){
         console.log('Got something: ' + retVal);
      }).catch(function(error){
         console.log('Error: ' + error);
      });
  }
  getAccount = () => {
     const that = this;
     that.transferService.getAccount().then(function(retVal: any){
         console.log("User Address: " + retVal);
         that.userAddress = retVal;
     }).catch(function(error){
         console.log(error);
     });
  }
  
  getContractsOwned = (owner: string) => {
     const that = this;
     that.transferService.getContractsOwnedLengthAddr(owner).then(function(retVal: number){
         console.log('owner has ' + retVal + ' contracts');
         for(var i = 0; i < retVal; ++i){
            that.transferService.getContractOwnedAddr(i, owner).then(function(retVal: string){
               that.transferService.getOracleStruct(retVal).then(function(struct: any){
                  that.contracts.push(
                     {
                        contractAddr: struct[0],
                        provider: struct[1],
                        buyer: struct[2],
                        data: struct[3],
                        needsUpdate: struct[4],
                        lastUpdate: struct[5],
                        dataType: struct[6],
                        dataFormat: struct[7],
                        updateCost: struct[8],
                        earned: struct[9],
                        deposited: struct[10],
                        updateCycle: struct[11]
                     }
                  );
                  console.log('Contract: ' + struct);
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
