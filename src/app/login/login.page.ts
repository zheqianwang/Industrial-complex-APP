import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { ToastService } from '../toast.service';
import { UrlService } from '../url.service';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginMethod = 0; //登录方式，0用户名密码，1手机短信验证码
    username;//用户名 、手机号
    password;//密码、短信验证码

    constructor(
        private router: Router,
        private platform: Platform,
        private native: AppMinimize,
        private toast: ToastService,
        private url: UrlService,
        private nav: NavController,
        private storage: Storage,
        /********** */
        private userSrv: UserService,

    ) {
    }

    ngOnInit() {
        
    }

    login() {
        this.userSrv.login(this.username, this.password).then(res => {
            if (res['status']) {
                this.toast.presentToast("验证成功，请稍候...", 100);
                this.router.navigate(['tabs']);
                var c = {
                    token: res["data"]["token"],
                    key: res["data"]["user"]["key"],
                };
                // document.cookie = JSON.stringify(c);
                this.storage.remove('cookie');
                this.storage.set('cookie',JSON.stringify(c));

                // document.cookie=res["data"];
                // this.router.navigate(['/']);
                // setTimeout(() => { window.location.href = "/tabs"; }, 500)
                // window.location.href="/tabs" //该跳转后获取的cookie是最新存储的
            } else {
                console.log('login-res=', res);
            }
        }, err => {
            this.toast.errorToast("连接服务器失败")
        });


        // this.url.login().then(res => {
        //     this.storage.remove('username');
        //     this.storage.set('username', res);
        //     this.router.navigate(['tabs']);
        // }, err => {
        //     this.toast.presentToast("连接服务器失败")
        // })
    }
}
