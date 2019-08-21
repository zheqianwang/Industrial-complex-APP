import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.page.html',
  styleUrls: ['./demo1.page.scss'],
})
export class Demo1Page implements OnInit {

  constructor(
      private nav:NavController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
  }

}
