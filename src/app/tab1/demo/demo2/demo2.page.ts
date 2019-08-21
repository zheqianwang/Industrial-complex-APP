import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.page.html',
  styleUrls: ['./demo2.page.scss'],
})
export class Demo2Page implements OnInit {

  constructor(
      private nav:NavController,
  ) { }

  ngOnInit() {
  }

}
