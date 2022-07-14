import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {


  WATCH_LIST_URL = "http://localhost:8084/api/v1/watchlist/"

  covidData : Array<{ id: string, country: string, active: string, recovered : string, death : string ,deaths:string}> = [];
  addedCountries=[];
  
  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async getMoreData(url: string,idx: number,country: string, id: string){
 
    if(url.startsWith('http')){
      const resp = await axios.get(url);
        // .then((resp)=>{
        
          this.covidData[idx].active = (Number.isInteger(resp.data.activeCases)&&this.numberWithCommas(resp.data.activeCases))||'NA';
          this.covidData[idx].recovered = (Number.isInteger(resp.data.recovered)&&this.numberWithCommas(resp.data.recovered))||'NA';
          this.covidData[idx].death = (Number.isInteger(resp.data.deceased)&&this.numberWithCommas(resp.data.deceased))||(Number.isInteger(resp.data.deaths)&&this.numberWithCommas(resp.data.deaths))||'NA';
          this.covidData[idx].country=country;
          this.covidData[idx].id=id;
      // console.log(this.covidData[idx].active);
      return;
    }
    this.covidData[idx].active = 'NA';
    this.covidData[idx].recovered='NA';
    this.covidData[idx].death='NA';
    this.covidData[idx].country=country;
    this.covidData[idx].id=id;
   
    return;
  }

  getWatchList(){
    const cookie = new Cookies();
    let config = {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('token')
      }
    }
    axios.get(this.WATCH_LIST_URL,config)
      .then(async (resp)=>{
        this.covidData = resp?.data.map(async (i: any, idx: number)=>{
          setTimeout(()=>this.getMoreData(i.details,idx,i.country,i._id), 1);
          // console.log(obj);
          return ({
          country : i.country,
          id: i._id
        })});
        console.log(resp?.data);
      })
      .catch((e)=>console.log(e));
  }

  delWatchList(id: string){
    const cookie = new Cookies();
    let config = {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('token')
      }
    }
    axios.delete(this.WATCH_LIST_URL+id,config)
      .then(async (resp)=>{
       
        this.getWatchList();
        alert("Removed Successfully")
      
      })
      .catch((e)=>console.log(e));
  }

  noOfCols=3;

  constructor() { }

  ngOnInit(): void {
    this.getWatchList();
  }

}
