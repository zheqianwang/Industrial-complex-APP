import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {LoginPage} from './login/login.page';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
// 手机摄像头调用
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
    declarations: [AppComponent,LoginPage],
    entryComponents: [],
    imports: [BrowserModule, FormsModule, IonicModule.forRoot({mode:'ios'}), AppRoutingModule,HttpClientModule, IonicStorageModule.forRoot(),
    NgZorroAntdMobileModule,

    ],
    providers: [
        StatusBar,
        SplashScreen,
        AppMinimize,
        HttpClientModule,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        Camera,
        File,
        FileTransfer,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
