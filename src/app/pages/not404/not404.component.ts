import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-not404',
  templateUrl: './not404.component.html',
  styleUrls: ['./not404.component.css']
})
export class Not404Component implements OnInit {

  usuario!: string;

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token!);
    this.usuario = decodedToken.user_name;
  }

}

