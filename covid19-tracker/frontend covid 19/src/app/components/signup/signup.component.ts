import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router :Router,private toast:NgToastService) { }

  BASE_URL = 'http://localhost:8084/register';
  email_regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  emailFlag:boolean=false;

  formData : {
    'firstName': string,
    'lastName': string,
    'email':string,
    'password': string,
    'cnfPassword': string,
  } = {
    firstName: '',
    lastName: '',
    email:'',
    password: '',
    cnfPassword: '',
  };
  updateData(e: any){
    this.formData = {...this.formData, [e.target.name] : e.target.value};
    // console.log(this.formData);
  }

  async register(e: any){
    e.preventDefault();
    //validation
    if(this.formData.firstName==""||this.formData.lastName==""|| this.formData.email==""||this.formData.password==""){
      return alert("All feilds are Mandatory")
    }
    else if(!(this.email_regex.test(this.formData.email))) return alert('Please enter a valid email')
 
    else if(this.formData.password.length<5) return alert('password Length is less than 5');
    else if(this.formData.cnfPassword!=this.formData.password) return alert('password not matched!!');
   
    
    const data = {
      first_name: this.formData.firstName,
      last_name: this.formData.lastName,
      email: this.formData.email.toLowerCase(),
      password: this.formData.password
    }
     await axios.post(this.BASE_URL, data)
     .then((resp)=>{
      if(resp.status==201) this.router.navigate(['./login']);
    this.toast.success({detail:this.formData.firstName+" Signup successful",summary:resp.statusText,duration:2000})
    if (resp.status==500)  console.log(resp.status)
    return;
     })
     .catch(()=>this.toast.error({detail:"User Already Present",duration:3000}))

  }

  ngOnInit(): void {
  }
  onTest(){
    console.log("hi")
  }

}
