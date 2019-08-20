import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from './url.service';
import {RsaService} from './rsa.service';
import {Buffer} from 'buffer';
import { ToastService } from '../toast.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = this.url.user;
  updateUrl = this.url.updateUser;
  listUrl = this.url.allUser;
  addUrl = this.url.addUser;
  removeUrl = this.url.removeUser;

  constructor(
    private rsa: RsaService,
    private http: HttpClient,
    private toast: ToastService,
    private url: UrlService,
    private storage: Storage,
  ) {
  }


  //获取user完整信息
  getUser(key: string): any {
    let user = {};
    return new Promise((resolve, reject) => {
      this.http.post(this.userUrl, {key: key},{headers:this.url.header()}).toPromise().then(res => {
          if (res['status']) {
            user = res['data'];
          } else {
            // ToastService.fail(res['msg']);
            this.toast.errorToast(res['msg']);
          }
          resolve(user);
        },
        msg => {
          // ToastService.fail(msg.error['msg']);
          this.toast.errorToast(msg.error['msg'])
          this.url.logout(msg);
          reject(user);
        });
    });
  }

  //获取user完整信息
  // userPhone(phone: string): any {
  //   let user = {};
  //   return new Promise((resolve, reject) => {
  //     this.http.post(this.url.userPhone, {phone: phone}).toPromise().then(res => {
  //         if (res['status']) {
  //           user = res['data'];
  //         } else {
  //           // this.message.error(res['msg']);
  //           ToastService.fail(res['msg']);
  //         }
  //         resolve(user);
  //       },
  //       msg => {
  //         // this.message.error(msg.error['msg']);
  //         ToastService.fail(msg.error['msg']);
  //         this.url.logout(msg);
  //         reject(user);
  //       });
  //   });
  // }

  //全部用户
  // getList(): any {
  //   let data = [];
  //   return new Promise((resolve, reject) => {
  //     this.http.get(this.listUrl,{headers:this.url.header()}).toPromise().then(res => {
  //       if (res['status'] && res['data']) {
  //         data = res['data'];
  //       }
  //       resolve(data);
  //     }, error1 => {
  //       ToastService.fail(error1.error['msg']);
  //       this.url.logout(error1);
  //       reject(data);
  //     });
  //   });
  // }

  //新增用户
  // newUser(user: any): any {
  //   user['username']=new Buffer(user['username']).toString('base64');//base64处理用户名，中文直接rsa加密，解密易出错
  //   return new Promise((resolve, reject) => {
  //     this.rsa.Encrypt(JSON.stringify(user)).then(encrypt => {
  //       if (!encrypt) {
  //         reject(false);
  //       }
  //       this.http.post(this.addUrl, {user: encrypt},{headers:this.url.header()}).toPromise().then(res => {
  //         if (!res['status']) {
  //           ToastService.fail(res['msg']);
  //         } else {
  //           ToastService.success(res['msg']);
  //         }
  //         resolve(res['status']);
  //       }, error1 => {
  //         ToastService.fail(error1.error['msg']);
  //         this.url.logout(error1);
  //         reject(false);
  //       });
  //     }, err => {
  //       reject(false);
  //     });
  //   });
  // }

  //更新用户信息
  update(user: any): any {
    user['username']=new Buffer(user['username']).toString('base64');//base64处理用户名，中文直接rsa加密，解密易出错
    return new Promise((resolve, reject) => {
      this.rsa.Encrypt(JSON.stringify(user)).then(encrypt => {
        if (!encrypt) {
          reject(false);
        }
        this.http.post(this.updateUrl, {user: encrypt},{headers:this.url.header()}).toPromise().then(res => {
          if (!res['status']) {
            // ToastService.fail(res['msg']);
            this.toast.errorToast(res['msg']);
          } else {
            // ToastService.success(res['msg']);
            this.toast.presentToast(res['msg'])
          }
          resolve(res['status']);
        }, error1 => {
          // ToastService.fail(error1.error['msg']);
          this.toast.errorToast(error1.error['msg'])
          this.url.logout(error1);
          reject(false);
        });
      }, err => {
        reject(false);
      });
    });

  }

  //修改密码
  public newPwd(key: string, pwd: string): any {
    return new Promise((resolve, reject) => {
      this.rsa.Encrypt(pwd).then(encrypt => {
        if (!encrypt) {
          reject(false);
        }
        this.http.post(this.url.newPwd, {key: key, pwd: encrypt}).toPromise().then(res => {
          if (!res['status']) {
            // ToastService.fail(res['msg']);
            this.toast.errorToast(res['msg']);
            reject(false);
          } else {
            resolve(res['status']);
          }
        }, error1 => {
          // ToastService.fail(error1.error['msg']);
          this.toast.errorToast(error1.error['msg']);
          reject(false);
        });
      }, err => {
        // ToastService.fail('用户加密验证出错');
        this.toast.errorToast('用户加密验证出错');
      });
    });
  }

  //验证用户key与密码匹配
  public authKey(key: string, pwd: string): any {
    return new Promise((resolve, reject) => { //promise嵌套，注意调用次序
      this.rsa.Encrypt(pwd).then(encrypt => {
        if (!encrypt) {
          reject(false);
        }
        this.http.post(this.url.authKey, {key: key, pwd: encrypt},{headers:this.url.header()}).toPromise().then(res => {
          if (!res['status']) {
            // ToastService.fail(res['msg']);
            this.toast.errorToast(res['msg']);
            reject(false);
          } else {
            resolve(res);
          }
        }, error1 => {
          // ToastService.fail(error1.error['msg']);
          this.toast.errorToast(error1.error['msg']);
          this.url.logout(error1);
          reject(false);
        });
      }, err => {
        reject(false);
      });
    });
  }

  //验证用户key与密码匹配  pubic有奇效，toLowerCase报错时请找。url，方法等
  public login(name: string, pwd: string): any {
    return new Promise((resolve, reject) => { //promise嵌套，注意调用次序
      this.rsa.Encrypt(pwd).then(res => {
        if (!res) {
          reject(false);
        }
        let data = {name: name, pwd: res};
        this.http.post(this.url.loginUrl, data).toPromise().then(res => {
          console.log(' login res = ',res);
          this.storage.remove('username');
          this.storage.remove('status');
          this.storage.remove('isLogin');
          this.storage.remove('token');
          this.storage.remove('key');
          this.storage.set('username',res);
          this.storage.set('status',res['status']);
          this.storage.set('isLogin',true);
          this.storage.set('token',res['data'].token);
          this.storage.set('key',res['data'].user.key);
          
          if (!res['status']) {
            // ToastService.fail(res['msg']);
            this.toast.errorToast(res['msg']);
            reject(false);
          } else {
            resolve(res);
          }
        }, error1 => {
          // ToastService.fail(error1.error['msg']);
          this.toast.errorToast.prototype(error1.error['msg']);
          reject(false);
        });
      }, err => {
        // ToastService.fail(err.error['msg']);
        this.toast.errorToast(err.error['msg']);
        reject(false);
      });
    });
  }

  //移除用户
  // remove(key: string): any {
  //   return new Promise((resolve, reject) => {
  //     if (!key) {
  //       reject(false);
  //     }
  //     this.http.post(this.removeUrl, {key: key},{headers:this.url.header()}).toPromise().then(res => {
  //       if (res['status']) {
  //         ToastService.success(res['msg']);
  //       } else {
  //         ToastService.fail(res['msg']);
  //       }
  //       resolve(res['status']);
  //     }, error1 => {
  //       ToastService.fail(error1.error['msg']);
  //       this.url.logout(error1);
  //       resolve(false);
  //     });
  //   });
  // }


}


