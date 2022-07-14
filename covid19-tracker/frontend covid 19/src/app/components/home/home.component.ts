import { Component, Input, OnInit, Output } from '@angular/core';
import axios from 'axios';
import Cookies from 'universal-cookie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  WATCH_LIST_URL = "http://localhost:8084/api/v1/watchlist/"

  totalCases : string = 'NA';
  activeCases : string = 'NA';
  recoveredCases : string = 'NA';
  fatalCases : string = 'NA';
  isLoading : boolean = true;

  //To check user is logged in or not 
  userLoggedIn:boolean=false;
  checkUserLoggedIn(){
    const cookie = new Cookies();
   if(cookie.get('token'))  this.userLoggedIn=true;
  }
 
 
 
  
  covidData : Array<{ country: string, active: string, recovered : string, death : string, moreData : string }> = [];
  covidDataShow : Array<{ country: string, active: string, recovered : string, death : string, moreData : string }> = [];
  addedCountries:Array<string>=[];

  noOfCols=3;

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  updateMethod(country:string, details: string){
    const cookie = new Cookies();
    let config = {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('token')
      }
    }
    const data = {
      country: country,
      details: details
    }
    axios.post(this.WATCH_LIST_URL,data,config)
      .then((resp)=>{
        alert('Added!')
        this.getWatchList();
      })
      .catch((e)=>console.log(e));
  }

  constructor() { }

  ngOnInit(): void {
    this.getData();
    this.checkUserLoggedIn();
    const cookie = new Cookies();
    if(cookie.get('token')){
      this.getWatchList()
    }
   
  }

  getData = async () => {
    axios.get('https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true')
      .then(async (resp)=>{
        this.covidData = await resp?.data.map((i: any)=>({
          country : i.country,
          active : (Number.isInteger(i.infected)&&this.numberWithCommas(i.infected))||'NA',
          recovered : (Number.isInteger(i.recovered)&&this.numberWithCommas(i.recovered))||'NA',
          death : (Number.isInteger(i.deceased)&&this.numberWithCommas(i.deceased))||'NA',
          moreData : i.moreData
        }));
        console.log(this.covidData);
        this.covidDataShow=this.covidData;
        // console.log(resp?.data[0].country)
        let tc=0,rc=0,fc=0;
        for(let i of resp?.data){
          if(Number.isInteger(i.infected)) tc+=i.infected;
          if(Number.isInteger(i.recovered)) rc+=i.recovered;
          if(Number.isInteger(i.deceased)) fc+=i.deceased;
        }
        this.totalCases = this.numberWithCommas(tc);
        this.activeCases = this.numberWithCommas(tc - rc - fc);
        this.recoveredCases = this.numberWithCommas(rc);
        this.fatalCases = this.numberWithCommas(fc);
        this.isLoading = false;
      })
      .catch((err)=>console.log(err));
  }

  covidSearch=(e: any)=>{

    let searchTerm=e.target.value;
    searchTerm=searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
    
    this.covidDataShow=this.covidData.filter((i)=>i.country.includes(searchTerm))
  };

  getWatchList(){
    const cookie = new Cookies();
    let config = {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('token')
      }
    }
    axios.get(this.WATCH_LIST_URL,config)
      .then( (resp)=>{
        this.addedCountries = resp?.data.map( (i: any, idx: number)=>i.country);
        console.log(this.addedCountries)
        console.log(resp?.data);
      })
      .catch((e)=>console.log(e));
      
  }
}

