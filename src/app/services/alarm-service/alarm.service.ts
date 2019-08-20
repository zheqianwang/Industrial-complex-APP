import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';
import { ToastService } from 'src/app/toast.service';


@Injectable({
    providedIn: 'root'
})
export class AlarmService {
    constructor(
        private http: HttpClient,
        private url: UrlService,
        private toast: ToastService,
    ) {
    }

    alarmList(): any {
        let data = [];
        return new Promise((resolve, reject) => {
            this.http.get(this.url.alarmlist).toPromise().then(res => {
                if (res['status'] && res['data']) {
                    data = res['data'];
                }
                resolve(data);
            }, error1 => {
                // this.message.error(error1.error['msg']);
                // ToastService.fail(error1.error['msg']);
                this.toast.errorToast(error1.error['msg']);
                reject(data);
            });
        });
    }

    alarmStgList(): any {
        let data = [];
        return new Promise((resolve, reject) => {
            this.http.get(this.url.alarmStgList).toPromise().then(res => {
                if (res['status'] && res['data']) {
                    data = res['data'];
                }
                resolve(data);
            }, res => {
                // this.message.error(res.error['msg']);
                // ToastService.fail(res.error['msg']);
                this.toast.errorToast(res.error['msg']);
                reject(data);
            });
        });
    }

    removeAlarmStg(key: string): any {
        return new Promise((resolve, reject) => {
            this.http.post(this.url.removeAlarmStg, { key: key }).toPromise().then(res => {
                if (res['status']) {
                    //   this.message.success(res['msg']);
                    // ToastService.success(res['msg']);
                    this.toast.presentToast(res['msg']);
                } else {
                    //   this.message.error(res['msg']);
                    // ToastService.fail(res['msg']);
                    this.toast.errorToast(res['msg']);
                }
                resolve(res['status']);
            }, res => {
                // this.message.error(res.error['msg']);
                // ToastService.fail(res.error['msg']);
                this.toast.errorToast(res.error['msg']);
                reject(false);
            });
        });
    }

    addAlarmStg(data): any {
        return new Promise((resolve, reject) => {
            this.http.post(this.url.addAlarmStg, data).toPromise().then(res => {
                if (res['status']) {
                    // ToastService.success(res['msg']);
                    this.toast.errorToast(res['msg']);
                } else {
                    // ToastService.fail(res['msg']);
                    this.toast.errorToast(res['msg']);
                }
                resolve(res['status']);
            }, res => {
                // ToastService.fail(res.error['msg']);
                this.toast.errorToast(res.error['msg']);
                reject(false);
            });
        });
    }

    updateAlarmStg(data: any): any {
        return new Promise((resolve, reject) => {
            this.http.post(this.url.updateAlarmStg, data).toPromise().then(res => {
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
                reject(false);
            });
        });
    }


}