import { Component , OnInit } from '@angular/core';
import Cookies from 'universal-cookie';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

 
  drawerOpen = false;
  constructor(private router: Router,private toast:NgToastService) { }
  username = '';

  updateName(){
    const cookie = new Cookies();
    this.username = cookie.get('username')||'';
  }

  ngOnInit(): void {
    this.updateName();
    // document.addEventListener('cookiechange',()=>this.updateName());
    window.setInterval(()=>this.updateName(), 100);
  }
  toggleOpen = ()=>{
    this.drawerOpen=!this.drawerOpen;
    return this.drawerOpen;
  }

  logout = () => {
    const cookie = new Cookies();
    cookie.remove('username');
    cookie.remove('token');
    this.router.navigate(['/']);
    setTimeout(() => { location.reload(); })   
  
  }


}
