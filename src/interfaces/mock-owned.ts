import {Sensor} from './sensor';

export const OWNED: Sensor[] = [
   {
      sensorId: "0xFFFFFFFF", 
      dataType: "Temperature",
      data: 33,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xyou",
      subscription: false,
      refresh: 0,
      subscribe: function(){
         this.subscription = true;
      },
      unsubscribe: function(){
         this.subscription = false;
      },
      setRefreshRate: function(rate: number){
         this.refresh = rate;
      },
      setData: function(newVal: number){
         this.data = newVal;
      }
   },
   {
      sensorId: "0xFFFFFFFF", 
      dataType: "Temperature",
      data: 89,
      cost: 6922,
      zipCode: "93930",
      rating: 99,
      owner: "0xyou",
      subscription: false,
      refresh: 0,
      subscribe: function(){
         this.subscription = true;
      },
      unsubscribe: function(){
         this.subscription = false;
      },
      setRefreshRate: function(rate: number){
         this.refresh = rate;
      },
      setData: function(newVal: number){
         this.data = newVal;
      }
   },
   {
      sensorId: "0xFFFFFFFF", 
      dataType: "Temperature",
      data: 22,
      cost: 338,
      zipCode: "93930",
      rating: 62,
      owner: "0xyou",
      subscription: false,
      refresh: 0,
      subscribe: function(){
         this.subscription = true;
      },
      unsubscribe: function(){
         this.subscription = false;
      },
      setRefreshRate: function(rate: number){
         this.refresh = rate;
      },
      setData: function(newVal: number){
         this.data = newVal;
      }
   },
   {
      sensorId: "0xFFFFFFFF", 
      dataType: "Temperature",
      data: 22,
      cost: 872,
      zipCode: "93930",
      rating: 95,
      owner: "0xyou",
      subscription: false,
      refresh: 0,
      subscribe: function(){
         this.subscription = true;
      },
      unsubscribe: function(){
         this.subscription = false;
      },
      setRefreshRate: function(rate: number){
         this.refresh = rate;
      },
      setData: function(newVal: number){
         this.data = newVal;
      }
   },
   {
      sensorId: "0xFFFFFFFF", 
      dataType: "Temperature",
      data: 36,
      cost: 672,
      zipCode: "93930",
      rating: 33,
      owner: "0xyou",
      subscription: false,
      refresh: 0,
      subscribe: function(){
         this.subscription = true;
      },
      unsubscribe: function(){
         this.subscription = false;
      },
      setRefreshRate: function(rate: number){
         this.refresh = rate;
      },
      setData: function(newVal: number){
         this.data = newVal;
      }
   },
]
