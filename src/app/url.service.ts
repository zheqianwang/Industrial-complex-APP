import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastService} from './toast.service';


@Injectable({
    providedIn: 'root'
})
export class UrlService {

    // public host = 'http://127.0.0.1:8899';
    // public host = 'http://212.64.2.48:8899';
    public host = 'http://127.0.0.1';
    // public host = 'http://10.24.20.71';

    public FileHost='http://127.0.0.1:9098';//文件服务后端
    

    hostPort = ':9060';
    public loginUrl = this.host + this.hostPort + '/login';

    constructor(
        private http: HttpClient,
        private toast:ToastService,
    ) {
    }

    login(){
        return new Promise(((resolve1, reject1) => this.http.post(this.loginUrl,{}).toPromise().then(res=>{
            if (res['status']){
                resolve1(res['username']);
                this.toast.presentToast("登录成功",1000);
            }else {
                reject1(false);
            }
        },error=>{
            reject1(false);
        })))
    }
}
