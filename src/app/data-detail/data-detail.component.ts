import { Component, OnInit, Inject } from '@angular/core';
import { Contract } from '../../interfaces/contract';
import { DOCUMENT } from '@angular/common';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss'],
  providers: [TransferService]
})
export class DataDetailComponent implements OnInit {

  userAddress = "";
  contractAddress = "";
  contract;
  updatesLeft = 0;
  emptyAddress = "0x0000000000000000000000000000000000000000"

  constructor(@Inject(DOCUMENT) private document: Document, private transferService: TransferService) { 
     var url = this.document.location.href;
     this.contractAddress = url.substring(url.lastIndexOf('/') + 1);
     this.getContract(this.contractAddress);
     this.getAccount();
  }
  ngOnInit() {
      var update = document.getElementById("update-modal");
      var withdraw = document.getElementById("withdraw-modal");
      var view = document.getElementById("view-modal");
      var deposit = document.getElementById("deposit-modal");
      var config = document.getElementById("configure-modal");
      update.style.display = "none";
      withdraw.style.display = "none";
      view.style.display = "none";
      deposit.style.display = "none";
      config.style.display = "none";
  }
  public openDeposit(){
     var deposit = document.getElementById("deposit-modal");
     var option = document.getElementById("deposit-option");
     if(deposit.style.display == "none"){
        deposit.style.display = "block";
        deposit.style.opacity = "1";
        option.style.backgroundColor = "white";
        option.style.color = "#ff9e00";
     }
     else{
        deposit.style.display = "none";
        deposit.style.display = "0";
        option.style.backgroundColor = "#dcdcdc";
        option.style.color = "#000000";
     }
  }
  public openConfigure(){
     var config = document.getElementById("configure-modal");
     var option = document.getElementById("configure-option");
     if(config.style.display == "none"){
        config.style.display = "block";
        config.style.opacity = "1";
        option.style.backgroundColor = "white";
        option.style.color = "#ff9e00";
     }
     else{
        config.style.display = "none";
        config.style.display = "0";
        option.style.backgroundColor = "#dcdcdc";
        option.style.color = "#000000";
     }
  }
  public openView(){
     var view = document.getElementById("view-modal");
     var option = document.getElementById("view-option");
     if(view.style.display == "none"){
        view.style.display = "block";
        view.style.opacity = "1";
        option.style.backgroundColor = "white";
        option.style.color = "#ff9e00";
     }
     else{
        view.style.display = "none";
        view.style.display = "0";
        option.style.backgroundColor = "#dcdcdc";
        option.style.color = "#000000";
     }
  }
  public openWithdraw(){
     var withdraw = document.getElementById("withdraw-modal");
     var option = document.getElementById("withdraw-option");
     if(withdraw.style.display == "none"){
        withdraw.style.display = "block";
        withdraw.style.opacity = "1";
        option.style.backgroundColor = "white";
        option.style.color = "#ff9e00";
     }
     else{
        withdraw.style.display = "none";
        withdraw.style.display = "0";
        option.style.backgroundColor = "#dcdcdc";
        option.style.color = "#000000";
     }
  }
  public openUpdate(){
     var update = document.getElementById("update-modal");
     var option = document.getElementById("update-option");
     
     if(update.style.display == "none"){
        update.style.display = "block";
        update.style.opacity = "1";
        option.style.backgroundColor = "white";
        option.style.color = "#ff9e00";
     }
     else{
        update.style.display = "none";
        update.style.display = "0";
        option.style.color = "#000000";
        option.style.backgroundColor = "#dcdcdc";
     }
  }
  getAccount = () => {
     const that = this;
     this.transferService.getUserBalance().then(function(retAccount: any){
         console.log(retAccount.account);
         that.userAddress = retAccount.account;
     }).catch(function(error){
         console.log(error);
     });
  }
  getContract = (address: string) => {
     const that = this;
     this.transferService.getOracleStruct(address).then(function(retVal: any){
         console.log('contract component :: getOracleStruct');
         console.log('Struct: ' + JSON.stringify(retVal));
         that.contract = {
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
         if(that.contract.deposited > 0)
            that.updatesLeft = Math.floor(that.contract.deposited / that.contract.updateCost);
     }).catch(function(error){
         console.log(error);
     });
  }
   public takeContract(contractAddr: any){
      const that = this;
      console.log('Hopefully taking contract: ' + that.contractAddress);
      this.transferService.takeContract(that.contractAddress).then(function(retVal: any){
         console.log('Got something: ' + retVal);
         that.contract.buyer = that.userAddress;
      }).catch(function(error){
         console.log('Error: ' + error);
      });
  }
  public deposit(){
      var value: number = +(<HTMLInputElement>document.getElementById("deposit-amount")).value;
      this.depositToContract(this.contractAddress, value);
      this.openDeposit();
  }
  public withdraw(){
     var value: number = +(<HTMLInputElement>document.getElementById("withdraw-amount")).value;
     this.withdrawFromContract(this.contractAddress, value);
     this.openWithdraw();
  }
  withdrawFromContract = (addr: string, amount: number) => {
     const that = this;
     console.log("Hopefully withdrawing: " + amount);
     this.transferService.withdrawEther(addr, amount).then(function(retVal: any){
        console.log('Withdrew ehter successfully');
        that.contract.earned -= amount;
     }).catch(function(error){
        console.log("Error: " + error);
     });
  }
  depositToContract = (addr: string, amount: number) => {
      const that = this;
      console.log("Hopefully depositing: " + amount + " to: " + addr);
      this.transferService.depositEther(addr, amount).then(function(retVal: any){
         console.log('Deposited ether successfully');
         that.contract.deposited += amount;
         that.updatesLeft = Math.floor(that.contract.deposited / that.contract.updateCost);
      }).catch(function(error){
         console.log("Error: " + error);
      });
  }
  public updateContract(){
      const that = this;
      var data = (<HTMLInputElement>document.getElementById("new-contract-data")).value;
      console.log('Hopefully updating contract: ' + that.contractAddress + "with: " + data);
      that.transferService.updateContract(that.contractAddress, data).then(function(retVal: any){
         console.log("wrote data: " + data + "to: " + that.contractAddress);
      }).catch(function(error){
         console.log(error);
      });
  }
}
