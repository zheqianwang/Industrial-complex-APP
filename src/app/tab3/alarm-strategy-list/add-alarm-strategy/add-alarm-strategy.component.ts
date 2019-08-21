import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AlarmService} from '../../../services/alarm-service/alarm.service';
import { PickerService  } from 'ng-zorro-antd-mobile';
import { district, provinceLite } from 'antd-mobile-demo-data';

import {DeviceService} from '../../../services/device-service/device.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-add-alarm-strategy',
  templateUrl: './add-alarm-strategy.component.html',
  styleUrls: ['./add-alarm-strategy.component.less']
})
export class AddAlarmStrategyComponent implements OnInit {
  @Input() option: string;
  @Input() alarmStg;
  @Input() parentCom;
  @Output() result: EventEmitter<any> = new EventEmitter();
  @ViewChild('inputElement',{static: true}) inputElement: ElementRef;

  loading = false;
  deviceList;
  tempLoading = false;
  codeRequired = true;
  nameRequired = true;
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.key === o2.key : o1 === o2);
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };

  constructor(
    private deviceService: DeviceService,
    private alarmService: AlarmService,
    private toast: ToastService
  ) {
  }

  submit() {
    this.valide();
    if (!this.codeRequired && !this.nameRequired) {
      
      let data = JSON.parse(JSON.stringify(this.alarmStg));
// console.log('提交的data=',data);
      switch (this.option) {
        case 'new': //新增
          this.alarmService.addAlarmStg(data).then(res => {
            this.close();
          }, err => {
          });
          break;
        case 'edit':  //编辑
          this.alarmService.updateAlarmStg(data).then(res => {
            this.close();
          }, err => {
          });
          break;
        default:
          break;
      }
    } else {
      // ToastService.fail('请完善表单信息!');
      this.toast.errorToast('请完善表单信息!');
    }
  }

  getDevice() {
    this.tempLoading = true;
    this.deviceService.deviceList().then(res => {
      this.deviceList = res;
      this.tempLoading = false;
    }, err => {
      this.tempLoading = false;
    });
  }

  close() {
    this.result.emit(true);
  }

  ngOnInit() {
    console.log('初始化 option = ',this.option);

    if(this.option == 'new'){
      this.codeRequired = true;
      this.nameRequired = true;
    }else if(this.option == 'edit'){
      this.codeRequired = false;
      this.nameRequired = false;
    }
    this.getDevice();
  }
  

  valide() {
    // console.log('this.alarmStg.code=',this.alarmStg.code)
    // console.log('this.alarmStg.name=',this.alarmStg.name)
    if (this.alarmStg.code) {
      this.codeRequired = false;
    } else {
      this.codeRequired = true;
    }
    if (this.alarmStg.name) {
      this.nameRequired = false;
    } else {
      this.nameRequired = true;
    }
  }

 
  // 检查‘策略编号’、‘策略名称’是否符合格式
  inputChange(str, e) {
    if (e.length <= 0) {
      if(str == '策略编号') {
        this.codeRequired = true;
        this.alarmStg['code'] = e;
      }else if(str == '策略名称') {
        this.nameRequired = true;
        this.alarmStg['name'] = e;
      }
    } else {
      if(str == '策略编号') {
        this.codeRequired = false;
        this.alarmStg['code'] = e;
      }else if(str == '策略名称'){
        this.nameRequired = false;
        this.alarmStg['name'] = e;
      }
    }
  }
  inputErrorClick(str, e) {
    // ToastService.fail(`${str}`+"不能为空!");
    this.toast.errorToast(`${str}不能为空!`);
  }

  

  change($event) {
    console.log($event, 'change');
  }

  checked = true;


}
