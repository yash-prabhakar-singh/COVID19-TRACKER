import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router,private toast:NgToastService) { }

  BASE_URL = "http://localhost:8084/login";

  // store input values
  email = '';
  password = '';

  updateEmail(e: any){
    this.email = e.target.value;
  }

  updatePassword(e: any){
    this.password = e.target.value;
  }

  // async onFormSubmit(e: any){
  //   e.preventDefault();
  //   const cookie = new Cookies();
  //   const resp = await axios.post(this.BASE_URL, {email: this.email,password: this.password});
  //   console.log(resp);
  //   if(resp.status==200){
  //     cookie.set('token', resp.data.token);
  //     cookie.set('username', resp.data.username);
  //     this.toast.success({detail:resp.data.first_name+" logged in successful",summary:resp.statusText,duration:3000})
  //     this.router.navigate(['./']);
  //   }else if(!resp){
  //     this.toast.error({detail:this.email+" internal server error ",duration:3000})
  //   }
  // }

  ngOnInit(): void {
  }


  async onSubmit(form:NgForm){
    console.log(form)
    const cookie = new Cookies();
    // const resp = await 
    axios.post(this.BASE_URL, {email: form.value.email,password: form.value.password})
      .then((resp)=>{
      cookie.set('token', resp.data.token);
      cookie.set('username', resp.data.username);
      this.toast.success({detail:" logged in successful",summary:resp.statusText,duration:3000})
      this.router.navigate(['./']);
      return;
    })
    .catch((e)=>this.toast.error({detail:" Invalid Credentials",duration:3000}))
  }
}
