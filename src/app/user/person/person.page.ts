import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RsaService } from 'src/app/services/rsa.service';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/url.service';
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  @Input() flag;
  loading = false;
  user = {};

  changePwd = false;
  changePhone = false;
  // @Input() key: string;
  key;

  constructor(
    private nav: NavController,
    private rsa: RsaService,
    private http: HttpClient,
    private url: UrlService,
    private userSrv: UserService,
    private storage: Storage,
  ) {
  }



  getUser() {
    this.loading = true;
    this.userSrv.getUser(this.key).then(user => {
      console.log('user = ',user)
      this.user = user;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.storage.get('username').then(r => {
      this.key = r.data.user.key;
      this.getUser();
    });
  }

  cancel($event: any) {
    if (event) {
      this.changePhone = false;
      this.changePwd = false;
    }
    this.getUser();
  }

  setIndex() {
    var user = JSON.parse(JSON.stringify(this.user));
    user['index'] = '';
    this.userSrv.update(user).then(r => {
      this.getUser();
    }, er => {

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.changePwd && !this.changePhone) {
      this.ngOnInit();
    }
  }

}
