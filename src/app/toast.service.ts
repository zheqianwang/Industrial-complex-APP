import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(info,delay?:number,style?:string) {
    const toast = await this.toastController.create({
      message: info,
      duration: delay?delay:500,
      position:'top',
      color: (style == 'error') ? 'danger' : (style == 'success') ? 'success' : (style == 'warning') ? 'warning' : (style == 'wait') ? 'primary' : 'success',  //绿色--------------这里的颜色要在src\theme\variables.scss文件中取值
    });
    toast.present();
  }
  async errorToast(info,delay?:number) {
    const toast = await this.toastController.create({
      message: info,
      duration: delay?delay:500,
      position:'top',
      color:'danger', //红色
    });
    toast.present();
  }
}
