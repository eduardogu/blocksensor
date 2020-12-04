export class Contract {
   
   sensorId: string;
   provider: string;//address
   buyer: string;//address
   dataTitle: string;
   data: string; 
   dataType: string;
   dataFormat: string;
   dataSystem: string[];
   updateCost: number;
   deposit: number;
   updateCycle: number;
   needsUpdate: boolean;

   constructor(
      owner: string,
      dtitle: string,
      dtype: string,
      dformat: string,
      updateCost: number, 
      updateCycle: number
   ){
      this.dataTitle = dtitle;
      this.provider = owner;
      this.dataType = dtype;
      this.dataFormat = dformat;
      this.updateCost = updateCost;
      this.updateCycle = updateCycle;
      
      this.needsUpdate = false;
      this.deposit = 0;
      this.buyer = "";
   }
   public depositVal(value: number){
      this.deposit += value;
   }
   public requestUpdate(){
      this.needsUpdate = true;
   }
   public update(data: string){
      this.data = data;
      this.needsUpdate = false;
   }
}
