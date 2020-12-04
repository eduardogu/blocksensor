import {Sensor} from './sensor';

export const SENSORS: Sensor[] = [
   {
      sensorId: "0xFFFFFFFF", 
      dataType: "Temperature",
      data: 0,
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
      data: 0,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xsomeoneelse",
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
      data: 0,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xsomeoneelse",
      subscription: true,
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
      data: 0,
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
      data: 0,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xsomeoneelse",
      subscription: true,
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
      data: 0,
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
      data: 0,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xsomeoneelse",
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
      data: 0,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xsomeoneelse",
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
      data: 0,
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
      data: 0,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xsomeoneelse",
      subscription: true,
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
      data: 0,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xsomeoneelse",
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
      data: 0,
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
      data: 0,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xsomeoneelse",
      subscription: true,
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
      data: 0,
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
      data: 0,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xsomeoneelse",
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
      data: 0,
      cost: 4398,
      zipCode: "93930",
      rating: 100,
      owner: "0xsomeoneelse",
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
   }

];
