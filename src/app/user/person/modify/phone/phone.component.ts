import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RsaService } from 'src/app/services/rsa.service';
import { HttpClient } from '@angular/common/http';
import { UrlService } from 'src/app/services/url.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent implements OnInit {

  @Input() key: string;
  @Input() oldPhone: string;
  @Input() data;
  @Output() result: EventEmitter<any> = new EventEmitter();


  current = 0;
  old_Phone = '';
  newPhone = '';
  btnloading = false;

  constructor(
    private userSrv: UserService,
    private rsaService: RsaService,
    private http: HttpClient,
    private url: UrlService,
    private toast: ToastService,
  ) {
  }

  ngOnInit() {
    console.log('key=', this.key)
    console.log('oldPhone=', this.oldPhone)
    console.log('data=', this.data)
  }

  close() {
    this.result.emit(true);
  }

  // 点击‘下一步’
  next(str: string) {
    this.btnloading = true;
    if (str === '1to2') {
      if (this.old_Phone == this.oldPhone) {
        // ToastService.success('验证通过', 1000);
        this.toast.presentToast('验证通过',1000)
        this.btnloading = false;
        this.current += 1;
      } else {
        // ToastService.fail('当前手机号输入错误', 1000);
        this.toast.errorToast('当前手机号输入错误',1000);
        setTimeout(() => this.btnloading = false, 1000);
      }
    }
    if (str === '2to3') {
      // 将新的手机号更新到后端服务器
      this.data['phone'] = this.newPhone;
      this.data = JSON.parse(JSON.stringify(this.data));
      this.userSrv.update(this.data).then(msg => {
        // ToastService.success('修改成功', 1000);
        this.toast.presentToast('修改成功',1000);
        this.btnloading = false;
        this.current += 1;
      }, msg => {
        // ToastService.fail('修改过程出现错误，请重新提交', 1000);
        this.toast.errorToast('修改过程出现错误，请重新提交',1000)
        setTimeout(() => this.btnloading = false, 1000);
      });

    }
    // if(str === 'end') {
    //   this.close();
    // }

  }

  logout() {
    document.cookie = '';
    window.location.href = '/';
  }


  authPhone() {

  }

  ensure() {

  }
}
