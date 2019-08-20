import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DeviceService } from '../../../services/device-service/device.service';

import * as uuid from 'uuid';
import { ToastService } from 'src/app/toast.service';
// import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.less']
})
export class DeviceDetailComponent implements OnInit {

  @Input() option;
  @Input() device;
  @Input() parentCom;
  @Output() result: EventEmitter<any> = new EventEmitter();

  loading = false;
  templateList;

  presetColors = ['#2ecc71', '#1abc9c', '#3498db', '#f1c40f', '#e67e22', '#e74c3c',
    '#78e08f', '#4a69bd', '#38ada9', '#fa983a', '#f8c291', '#fad390',
    '#A8EBE1', '#FFEAC0', '#9FBECC', '#EFFFED', '#D8AAB9', '#F5DFDF',
  ];//预置颜色选项

  nullDevice = {
    key: null,
    code: null,
    type: null,
    group: null,
    name: null,
    servername: null,
    serveraddress: null,
    template: null,
    connect: null,
    interval: null,
    model: null,
    gps: null,
    phone: null,
    manufacturer: null,
    status: null,
    note: null,
    time: null,
    attrs: [],
    display: true,
    devicesetting: {
      cardcolor: "#2ecc71"
    }
  };

  timeUint = 'ms';
  t = 0;
  codeRequire = true;
  nameRequire = true;
  templateRequire = true;

  @ViewChild('telEle',{static: true}) telEle: ElementRef;
  @ViewChild('codeEle',{static: true}) codeEle: ElementRef;

  constructor(
    // private message: NzMessageService,
    private deviceService: DeviceService,
    private toast: ToastService
  ) {
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.key === o2.key : o1 === o2);

  close() {
    this.result.emit(true);
  }

  //计算时间间隔显示值
  parseInterval() {
    this.t = this.device['interval'] ? JSON.parse(JSON.stringify(this.device))['interval'] : 0;
    if (this.t >= 1000 && this.t % 1000 == 0) {
      this.timeUint = 's';
      this.t = this.t / 1000;
      if (this.t >= 60 && this.t % 60 == 0) {
        this.timeUint = 'min';
        this.t = this.t / 60;
        if (this.t >= 60 && this.t % 60 == 0) {
          this.timeUint = 'h';
          this.t = this.t / 60;
          if (this.t >= 24 && this.t % 24 == 0) {
            this.timeUint = 'd';
            this.t = this.t / 24;
          }
        }
      }
    }
  }

  // 检查‘设备编号’、‘设备名称’是否符合格式
  inputChange(str, e) {
    if (e.length <= 0) {
      if (str == '设备编号') {
        this.codeRequire = false;
        this.device['code'] = e;
      } else if (str == '设备名称') {
        this.nameRequire = false;
        this.device['name'] = e;
      }
    } else {
      if (str == '设备编号') {
        this.codeRequire = true;
        this.device['code'] = e;
      } else if (str == '设备名称') {
        this.nameRequire = true;
        this.device['name'] = e;
      }
    }
  }
  inputErrorClick(str, e) {
    // ToastService.fail(`${str}` + "不能为空!");
    this.toast.errorToast(`${str}不能为空!`)
  }

  //提交前验证
  validate() {
    if (this.device.code) {
      this.codeRequire = true;
    } else {
      this.codeRequire = false;
    }
    if (this.device.name) {
      this.nameRequire = true;
    } else {
      this.nameRequire = false;
    }
    if (this.device.template) {
      this.templateRequire = true;
    } else {
      this.templateRequire = false;
    }
  }


  //提交保存
  submit() {
    this.loading = true;
    this.validate();
    if (this.codeRequire && this.nameRequire && this.templateRequire) {
      let data = JSON.parse(JSON.stringify(this.device));
      data.interval = JSON.parse(JSON.stringify(this.t));
      switch (this.timeUint) {
        case 'ms':
          data.interval = data.interval * 1;
          break;
        case 's':
          data.interval = data.interval * 1000;
          break;
        case 'min':
          data.interval = data.interval * 1000 * 60;
          break;
        case 'h':
          data.interval = data.interval * 1000 * 60 * 60;
          break;
        case 'd':
          data.interval = data.interval * 1000 * 60 * 60 * 24;
          break;
        default:
          break;
      }
      // data.interval = data.interval.toString();
      data.attrs = data.attrs.filter(a => a.key != 'null'); //去除添加尾行
      switch (this.option) {
        case 'new': //新增
          this.deviceService.newDevice(data).then(res => {
            this.close();
            this.loading = false;
          }, err => {
            this.loading = false;
          });
          break;
        case 'edit':  //编辑
          this.deviceService.updateDevice(data).then(res => {
            this.close();
            this.loading = false;
          }, err => {
            this.loading = false;
          });
          break;
        default:
          this.loading = false;
          break;
      }
    } else {
      // ToastService.fail('请完善表单信息!');
      this.toast.errorToast('请完善表单信息!');
      this.loading = false;
    }
    this.ngOnInit();
  }

  ionBlur() {
    alert('ionBlur')
  }
  ionChange() {
    alert('ionChange')
  }
  ionFocus() {
    alert('ionFocus')
  }

  //重置设备属性
  reset() {
    console.log('点击了 重置，option=', this.option)
    if (this.option == 'new') {
      this.device = JSON.parse(JSON.stringify(this.nullDevice)); console.log('重置之后的 device=', this.device)
      this.addNullAtt();
    }
    if (this.option == 'edit') {
      this.loading = true;
      this.deviceService.findDeviceCode(this.device.code).then(res => {
        if (res['status']) {
          this.device = res['data'];
          this.loading = false;
          this.addNullAtt();
        } else {
          // ToastService.fail('重置设备信息出错!');
          this.toast.errorToast('重置设备信息出错!');
          this.loading = false;
          this.addNullAtt();
        }
      }, err => {
        // ToastService.fail('重置设备信息出错!');
        this.toast.errorToast('重置设备信息出错!');
        this.loading = false;
        this.addNullAtt();
      });
    }
    this.parseInterval();
  }

  //添加设备属性
  addAttr() {
    this.device.attrs = [...this.device.attrs.filter(a => a.code != 'null'), {
      key: null,
      name: null,
      code: uuid.v4(),
      unit: null,
      description: null,
      valuetype: 'number',
      sum: false
    }];
    this.addNullAtt();
  }

  addNullAtt() {
    this.device.attrs = [...this.device.attrs, {
      key: null,
      name: null,
      code: 'null',
      unit: null,
      description: null,
      valuetype: null,
      sum: false
    }];
  }

  //删除设备属性
  remove(code: any) {
    this.device.attrs = this.device.attrs.filter(a => a.code != code);
  }

  //获取模板列表
  getTemplate() {
    this.loading = true;
    this.deviceService.deviceTempList().then(res => {
      this.templateList = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }


  templateChanged() {
    this.device.template ? this.templateRequire = true : this.templateRequire = false;
    this.device.attrs = this.device.template.attrs;
    this.addNullAtt();
  }

  //切换时间单位，计算显示值，暂时未处理尾差
  calcTime() {
    this.t = this.device['interval'] ? JSON.parse(JSON.stringify(this.device))['interval'] : 0;
    switch (this.timeUint) {
      case 'ms':
        this.t /= 1;
        break;
      case 's':
        this.t /= 1000;
        break;
      case 'min':
        this.t /= 60000;
        break;
      case 'h':
        this.t /= 3600000;
        break;
      case 'd':
        this.t /= 86400000;
        break;
      default:
        break;
    }
  }

  telChange(value: string): void {
    const reg = /^([1-9][0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value))) { }
    else {
      value = value.toString().slice(0, value.toString().length - 1);
    }
    this.telEle.nativeElement.value = value
    this.device['phone'] = this.telEle.nativeElement.value
  }

  codeChange(value: string): void {
    const reg = /^([A-Z][0-9]*)$/;
    if ((!isNaN(+value) && reg.test(value))) { }
    else {
      value = value.toString().slice(0, value.toString().length - 1);
    }
    this.codeEle.nativeElement.value = value
    this.device['code'] = this.codeEle.nativeElement.value
  }

  ngOnInit() {
    if (this.option == 'new') {
      this.device = JSON.parse(JSON.stringify(this.nullDevice));
    }
    this.getTemplate();
    this.parseInterval();
    this.addNullAtt();
  }

}

