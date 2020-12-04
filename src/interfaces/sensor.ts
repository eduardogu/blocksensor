
export class Sensor {
   sensorId: string;
   dataType: string;
   data: number;
   cost: number;
   zipCode: string;
   rating: number;
   owner: string;
   subscription: boolean;
   refresh: number;

   constructor(
      id: string,
      dataType: string,
      cost: number,
      zipCode: string,
      rating: number,
      owner: string
   ){
      this.sensorId = id;
      this.dataType = dataType;
      this.data = 0;
      this.cost = cost;
      this.zipCode = zipCode;
      this.subscription = false;
      this.refresh = 0;
   }

   public subscribe(){
      this.subscription = true;
   }
   public unsubscribe(){
      this.subscription = false;
   }
   public setRefreshRate(rate: number){
      this.refresh = rate;
   }
   public setData(newVal: number){
      this.data = newVal;
   }

}
