import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = localStorage.getItem('token');
  constructor(    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);
    setTimeout( () => {
      window.location.reload();
    }, 1000);
  }

}
