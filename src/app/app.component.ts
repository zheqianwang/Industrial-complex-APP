import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { WelcomeComponent } from './welcome/welcome.component';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private welcomeComponent: WelcomeComponent,
        private storage: Storage,
        private router: Router
    ) {
        this.storage.get('firstIn').then((result) => { 
             console.log(' result = ',result)
            if(result){  
            //   this.rootPage = HomePage; 
            this.router.navigate(['tabs']);
            } else{
              this.storage.set('firstIn', true);
              this.router.navigate(['welcome']);
            //   this.rootPage = WelcomePage;
            }
        });
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.show();
            this.statusBar.backgroundColorByHexString("#ffffff");
            this.statusBar.styleDefault();
            // 在应用程序启动期间（也在应用程序启动完之后起作用）显示和隐藏启动画面
            this.splashScreen.hide();   //在应用程序启动期间有动画，在应用程序启动之后动画消失
            // this.splashScreen.show();    //在应用程序启动期间和应用程序启动完之后都有动画


        });
    }
}
