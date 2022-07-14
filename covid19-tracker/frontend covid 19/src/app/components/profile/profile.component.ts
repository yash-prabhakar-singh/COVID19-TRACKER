import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {  NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private toast:NgToastService) { }

  BASE_URL = 'http://localhost:8084/api/v1/self'
  UPDATE_URL = 'http://localhost:8084/api/v1/changepassword'

  edit:boolean=true;
  save:boolean=false;
  password:boolean=true;
  updatePass:boolean=false;
  
  submitClick(id: string){
    document.getElementById(id)?.click();
  }

  userData :
    {
      'id': number,
      'firstName': string,
      'lastName': string,
      'email':string,
      'password': string,
      'newPassword': string,
    } = {
      id: 0,
      firstName: '',
      lastName: '',
      email:'',
      password: '',
      newPassword: '',
    };

  onEdit(){
   this.save=true;
   this.edit=false;
  }
  onCancel(
  ){
    this.save=false;
    this.edit=true;
  }
  onCancelP(){
    this.password=true;
    this.updatePass=false;
  }

  onSave(){
    this.submitClick('submit-profile')
  }
  onPassword(){
    this.password=false;
    this.updatePass=true;
  }
  onUpdatePass(){
    this.submitClick('submit-password')
  }

  getProfile(){
    const cookie = new Cookies();
    let config = {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('token')
      }
    }
    axios.get(this.BASE_URL,config)
      .then((resp)=>{
        this.userData.firstName=resp.data.first_name;
        this.userData.lastName=resp.data.last_name;
        this.userData.newPassword = resp.data.password;
        this.userData.email = resp.data.email;
        this.userData.password = resp.data.password;
        this.userData.id = resp.data.userId;
        
        
      })
      .catch((e)=>console.log(e));
  }

  ngOnInit(): void {
    this.getProfile();
  }

  updateMethod(first_name:string, last_name: string, email: string, password: string){
    const cookie = new Cookies();
    let config = {
      headers: {
        'Authorization': 'Bearer ' + cookie.get('token')
      }
    }
    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
    }
    axios.post(this.UPDATE_URL,data,config)
      .then((resp)=>{
        this.getProfile();
        this.edit=true;
        this.save=false;
        this.updatePass=false;
        this.password=true;
      })
      .catch((e)=>console.log(e));
  }

  editUserDetails(form:NgForm){
    this.toast.success({detail:"Profile Updated Successfully",duration:2000})
    this.updateMethod(form.value.first_name,form.value.last_name,form.value.email,this.userData.newPassword);

  }
  updatePassword(form:NgForm){
    if(form.value.new_password.length<5) return  this.toast.error({detail:"password Length is less than 5 ",duration:3000})
    if(form.value.old_password==this.userData.password){
      this.updateMethod(this.userData.firstName,this.userData.lastName,this.userData.email,form.value.new_password);
      this.toast.success({detail:"Password Updated Successfully",duration:3000})
    }
      else{
        this.toast.error({detail:"Old password Not matched !!",duration:3000})
      }
  }
  
}
