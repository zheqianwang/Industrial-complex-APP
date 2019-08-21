import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from '../url.service';
import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/toast.service';
// import {el} from '@angular/platform-browser/testing/src/browser_util';
import { Storage } from '@ionic/storage';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})

export class DeviceService {

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private url: UrlService,
    private storage: Storage,
  ) {
  }

  public wsUrl = this.url.wsHost + 'devicevalue';

  //设备模板list
  deviceTempList(): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url.tempList, { headers: this.url.header() }).toPromise().then(res => {
        if (res['status'] && res['data']) {
          data = res['data'];
        }
        resolve(data);
      }, res => {
        // ToastService.fail(res.error['msg']);
        this.toast.errorToast(res.error['msg']);
        this.url.logout(res);
        reject(data);
      });
    });
  }

  //新增设备模板
  newDeviceTemp(template: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.addTemp, template, { headers: this.url.header() }).toPromise().then(res => {
        if (res['status']) {
          // ToastService.success(res['msg']);
          this.toast.presentToast(res['msg']);
        } else {
          // ToastService.fail(res['msg']);
          this.toast.errorToast(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        // ToastService.fail(res.error['msg']);
        this.toast.errorToast(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }

  //删除设备模板
  removeTemp(key: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.removeTemp, { key: key }, { headers: this.url.header() }).toPromise().then(res => {
        if (res['status']) {
          // ToastService.success(res['msg']);
          this.toast.presentToast(res['msg']);
        } else {
          // ToastService.fail(res['msg']);
          this.toast.errorToast(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        // ToastService.fail(res.error['msg']);
        this.toast.errorToast(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }

  //更新设备模板，注意时间时区
  updateTemplate(temp: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateTemp, temp, { headers: this.url.header() }).toPromise().then(res => {
        if (res['status']) {
          // ToastService.success(res['msg']);
          this.toast.presentToast(res['msg']);
        } else {
          // ToastService.fail(res['msg']);
          this.toast.errorToast(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        // ToastService.fail(res.error['msg']);
        this.toast.errorToast(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }


  // 上边是模板
  //
  // 分割线
  //
  // 下边是设备


  //新增设备
  newDevice(device: any): any {
    if (device['template']) {
      device['template']['time'] = device['template']['time'].replace(' ', 'T') + '+08:00';
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.url.addDevice, device, { headers: this.url.header() }).toPromise().then(res => {
        if (res['status']) {
          // ToastService.success(res['msg']);
          this.toast.presentToast(res['msg']);
        } else {
          // ToastService.fail(res['msg']);
          this.toast.errorToast(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        // ToastService.fail(res.error['msg']);
        this.toast.errorToast(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }

  //删除设备
  removeDevice(key: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.removeDevice, { key: key }, { headers: this.url.header() }).toPromise().then(res => {
        if (res['status']) {
          // ToastService.success(res['msg']);
          this.toast.presentToast(res['msg']);
        } else {
          // ToastService.fail(res['msg']);
          this.toast.errorToast(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        // ToastService.fail(res.error['msg']);
        this.toast.errorToast(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }

  //更新设备，注意时间时区
  updateDevice(device: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateDevice, device, { headers: this.url.header() }).toPromise().then(res => {
        // this.http.post(this.url.updateDevice, device).toPromise().then(res => {
        if (res['status']) {
          // ToastService.success(res['msg']);
          this.toast.presentToast(res['msg']);
        } else {
          // ToastService.fail(res['msg']);
          this.toast.errorToast(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        // ToastService.fail(res.error['msg']);
        this.toast.errorToast(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });
  }

  // 更新设备图片
  updateDeviceImg(device: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateDeviceImg, device).toPromise().then(res => {
        if (res['status']) {
          this.toast.presentToast('操作成功')
        } else {
          this.toast.errorToast('操作失败')
        }
        resolve(res['status']);
      }, err => {
        this.toast.errorToast(err.error['msg'])
        // console.log('err = ',err)
        reject(false);
      })
    })
  }

  t;
  k;
  //设备list
  deviceList(): any {
    let data = [];
    // this.storage.get('token').then(res => {
    //   this.t = res;
    //   this.storage.get('key').then(res2 => {
    //     this.k = res2;
    //     return new Promise((resolve, reject) => {
    //       this.http.get(this.url.deviceList, { headers: { token: this.t, user: this.k } }).toPromise().then(res3 => {
    //         console.log(' res3 success = ', res3)
    //         if (res3['status'] && res3['data']) {
    //           data = res3['data'];
    //         }
    //         resolve(data);
    //       }, res4 => {
    //         console.log('res4 fail = ', res4)
    //         // this.toast.errorToast(res.error['msg']);
    //         this.url.logout(res4);
    //         reject(data);
    //       })
    //     })
    //   })
    // })

    return new Promise((resolve, reject) => {
      console.log('1')
      this.http.get(this.url.deviceList, { headers: this.url.header() }).toPromise().then(res => {

        // this.http.get(this.url.deviceList).toPromise().then(res => {
        // this.http.get(this.url.deviceList, {headers:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjgzNzU3ODgsImlzcyI6Ikluc3B1ci1NT00iLCJuYmYiOjE1NjU3ODI3ODh9.f_tI2qPOZLV-gVLaGu6sj3B8pHABdN-WaIAINjCh7KE",user:"e4f81723-6903-4f61-987a-8fc0e57032f8"}}).toPromise().then(res => {
        console.log(' res success = ', res)
        if (res['status'] && res['data']) {
          data = res['data'];
        }
        resolve(data);
      }, res => {
        console.log('res fail = ', res)
        // this.toast.errorToast(res.error['msg']);
        this.url.logout(res);
        reject(data);
      });
    });
  }


  // 设备列表采用异步等待的方式实现
  async deviceListAsyncAwait() {
    let data = [];
    return await new Promise((resolve, reject) => {
      this.http.get(this.url.deviceList, { headers: this.url.header() }).toPromise().then(res => {
        console.log(' res success = ', res)
        if (res['status'] && res['data']) {
          data = res['data'];
        }
        resolve(data);
      }, res => {
        console.log('res fail = ', res)
        this.url.logout(res);
        reject(data);
      });
    })
  }

  //查找设备
  findDeviceCode(code: string): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.post(this.url.deviceCode, { code: code }, { headers: this.url.header() }).toPromise().then(res => {
        resolve(res);  //status为true时 data为设备信息，为false时msg为错误信息
      }, res => {
        reject(res);
        this.url.logout(res);
      });
    });
  }

  //获取设备数值
  deviceValue(codes: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.deviceValue, { keys: codes }, { headers: this.url.header() }).toPromise().then(res => {
        // this.http.post(this.url.deviceValue, { keys: codes }).toPromise().then(res => {
        if (res['status'] && res['data']) {
          resolve(res['data']);  //status为true时 data为设备信息，为false时msg为错误信息
        } else {
          reject(res['msg']);
        }
      }, res => {
        reject(res['msg']);
        this.url.logout(res);
      });
    });
  }

}
