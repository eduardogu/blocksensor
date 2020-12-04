import { Component, OnInit } from '@angular/core';
import { TransferService } from '../services/transfer.service';
import { OWNED } from '../../interfaces/mock-owned';

@Component({
  selector: 'app-sensor-view',
  templateUrl: './sensor-view.component.html',
  styleUrls: ['./sensor-view.component.scss'],
  providers: [TransferService]
  
})
export class SensorViewComponent implements OnInit {
  
  owned = OWNED;
  contractsOwnedLength = 0;
  contractsOwned = [];
  emptyAddress = "0x0000000000000000000000000000000000000000"
  emptyValue = 0;

  constructor(private transferService: TransferService){ 
      this.getContractsOwned(0);
  }

  ngOnInit() {
      var addsensor = document.getElementById("add-modal");
      var filter = document.getElementById("filter-modal");
      filter.style.display = "none";
      addsensor.style.display = "none";
      
  }
  public openFilter(){
     
     var filter = document.getElementById("filter-modal");
     var option = document.getElementById("filter-option");
     this.closeAdd();
     if(filter.style.display == "none"){
        filter.style.display = "block";
        filter.style.opacity = "1";
        option.style.backgroundColor = "white";
        option.style.color = "#ff9e00";
     }
     else{
        filter.style.display = "none";
        filter.style.opacity = "0";
        option.style.color = "#000000";
        option.style.backgroundColor = "#dcdcdc";
     }
  }
  public closeFilter(){
     var filter = document.getElementById("filter-modal");
     var option = document.getElementById("filter-option");

     filter.style.display = "none";
     filter.style.opacity = "0";
     option.style.color = "#000000";
     option.style.backgroundColor = "#dcdcdc";
  }
  public closeAdd(){
     var addsensor = document.getElementById("add-modal");
     var option = document.getElementById("add-option");
     
     addsensor.style.display = "none";
     addsensor.style.opacity = "0";
     option.style.backgroundColor = "#dcdcdc";
     option.style.color = "black";
  }
  public openAddSensor(){
     var addsensor = document.getElementById("add-modal");
     var option = document.getElementById("add-option");
     this.closeFilter();
     if(addsensor.style.display == "none"){
         addsensor.style.display = "block";
         addsensor.style.opacity = "1";
         option.style.backgroundColor = "white";
         option.style.color = "#ff9e00";
     }
     else{
         addsensor.style.display = "none";
         addsensor.style.opacity = "0";
         option.style.backgroundColor = "#dcdcdc";
         option.style.color = "black";
     }
  }

  public createOracle(){
      const that = this;
      var oracle = {
         contractAddr: '',
         provider: '',
         buyer: '',
         needsUpdate: '',
         lastUpdate: '',
         dataType: '',
         dataFormat: '',
         updateCost: 0,
         earned: 0,
         deposited: 0,
         updateCycle: 0,
      }
      oracle.contractAddr = this.emptyAddress;
      oracle.buyer = this.emptyAddress;
      oracle.earned = 0;
      oracle.deposited = 0;
      oracle.dataType = (<HTMLInputElement>document.getElementById("datatype")).value;
      oracle.dataFormat = (<HTMLInputElement>document.getElementById("dataformat")).value;
      oracle.updateCost = parseInt((<HTMLInputElement>document.getElementById("costPerUpdate")).value);
      oracle.updateCycle = parseInt((<HTMLInputElement>document.getElementById("cycles")).value);

      console.log(JSON.stringify(oracle));
      this.transferService.createOracle(oracle).then(function(retVal: any){
         console.log(retVal);
         console.log(JSON.stringify(oracle));
         that.contractsOwned.push(oracle);
      }).catch(function(error){
         console.log(error);
      });
      this.closeAdd();
  }
   getContractsOwned = (page: number) => {
     const that = this;
     this.transferService.getContractsOwnedLength().then(function(retVal: any){
         console.log('profile component :: getContractsTakenLength :: length');
         console.log('Contracts owned: ' + retVal);
         that.contractsOwnedLength = retVal;
         for(var i = 0; i < that.contractsOwnedLength; ++i){
             that.transferService.getContractOwned(page + i).then(function(retVal: any){
                 console.log('profile component :: getContractTaken');
                 console.log('Contract addr: ' + retVal);
                 that.transferService.getOracleStruct(retVal).then(function(retVal: any){
                    console.log('sensor component :: getContractsTaken :: getOracleStruct');
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
