import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  constructor(
    // public navCtr: NavController,
    private router: Router,
  ) { }

  goToHome(){
    // this.navCtr.setRoot(HomePage);
    this.router.navigate(['tabs']);
}

  ngOnInit() {}

}
