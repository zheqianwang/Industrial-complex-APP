import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'ng-zorro-antd-mobile';
// import { ToastService } from 'src/app/toast.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {

  @Input() key: string;

  @Output() result: EventEmitter<any> = new EventEmitter();

  pwdLength = true;
  lenStatus;
  confirmOK = true;
  confirmStatus;

  current = 0;
  oldpwd = '';
  newpwd = '';
  confirm = '';

  btnloading = false;
  countdown = 3; //倒计时3秒
  time; //计时器标记
  constructor(
    private router: Router,
    private userSrv: UserService,
    private _toast: ToastService,
    private storage: Storage,
  ) {
  }

  ngOnInit() {
  }

  close() {
    this.result.emit(true);
  }

  next() {
    this.current += 1;
    let i = 0;
    // 判断是否是“修改完成”页面，设置倒计时。
    if (this.current == 2) {
      setTimeout(() => this.dealy(), 1000);
    }
  }
  // 延时函数
  dealy() {
    this.countdown--;
    if (this.countdown > 0) {
      this.time = setTimeout(() => this.dealy(), 1000);
    } else {
      this.logout();
    }
  }
  //验证旧密码
  authyKey() {
    this.btnloading = true;
    this.userSrv.authKey(this.key, this.oldpwd).then(res => {
      if (res["status"]) {
        this.btnloading = false;
        this.next();
      }
    }, msg => {
      this.btnloading = false;
    });
  }

  //确认新密码
  ensure() {
    this.btnloading = true;
    this.valideLen();
    this.valide();
    if (this.newpwd.length >= 6 && this.pwdLength && this.confirmOK) {
      // console.log('密码格式正确，且两次密码相同')
      // console.log('新密码=', this.newpwd)
      this.userSrv.newPwd(this.key, this.newpwd).then(res => {
        if (res) {
          this.next();
        }
      }, err => {
      });
    }
    this.btnloading = false;
  }
  // 检查两次输入的密码是否正确
  valide() {
    if (this.newpwd != this.confirm) {
      this.confirmOK = false;
      // this.confirmStatus = 'error';
      this.displayErrMsg('两次密码不相同，请重新输入!');
    } else {
      this.confirmOK = true;
      // this.confirmStatus = 'success';
    }
  }
  // 检查新密码的长度
  valideLen() {
    if (this.newpwd.length < 6 || this.newpwd.length > 16) {
      this.pwdLength = false;
      // this.lenStatus = 'error';
      this.displayErrMsg('请输入6~16位长度密码!');
    } else {
      this.pwdLength = true;
      // this.lenStatus = 'success';
    }
  }

  // 显示错误信息
  displayErrMsg(str: string) {
    ToastService.fail(str);
    // this.toast.errorToast(str)
  }

  logout() {
    document.cookie = '';
    // window.location.href = '/';

    this.storage.remove('username');
    clearTimeout(this.time);
    // this.router.navigate(['/login']);
    this.router.navigate(['login'])
  }
}
