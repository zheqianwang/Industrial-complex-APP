import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../../services/alarm-service/alarm.service';
import { ModalService, PickerService } from 'ng-zorro-antd-mobile';
import { district, provinceLite } from 'antd-mobile-demo-data';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-alarm-strategy-list',
  templateUrl: './alarm-strategy-list.component.html',
  styleUrls: ['./alarm-strategy-list.component.scss']
})
export class AlarmStrategyListComponent implements OnInit {

  alarmStgDetail = false;
  loading = false;
  alarmStg;
  alarmStgList = [];
  inputFocus = false;   //搜索框默认没有焦点

  nullAlarmStg = {
    key: null,
    name: null,
    code: null,
    time: null,
    device: null,
    attribute: null,
    conditiona: { 'key': null, 'value': null },
    conditionb: { 'key': null, 'value': null },
    level: '0',
    interval: null,
    note: null,
    status: true
  };
  option;
  searchValue;
  currentIndex = 1;
  pageSize = 10;
  sizeOption = [5, 10, 20, 50];

  shrink = true;  //收缩
  key;  //策略的key

  constructor(
    private alarmService: AlarmService,
    private _modal: ModalService,
    private toast: ToastService,

  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.alarmService.alarmStgList().then(res => {
      this.alarmStgList = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  add() {
    this.alarmStg = JSON.parse(JSON.stringify(this.nullAlarmStg));
    this.option = 'new';
    this.alarmStgDetail = true;
  }

  remove(key: any) {
    ModalService.alert('删除', '确定删除?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确定',
        onPress: () =>
          new Promise(resolve => {

            this.alarmService.removeAlarmStg(key).then(res => {
              this.getList();
              setTimeout(resolve, 1);
              // ToastService.success('删除成功！', 1000);
              this.toast.presentToast('删除成功',1000);
            }, err => {
              this.getList();
              setTimeout(resolve, 1);
              // ToastService.fail('删除失败！', 1000);
              this.toast.errorToast('删除成功',1000);
            });
          }),
        style: {
          color: '#ffffff',
          background: '#108ee9'
        }
      }
    ]);

    // this.alarmService.removeAlarmStg(key).then(res => {
    //   this.getList();
    // }, err => {
    //   this.getList();
    // });
  }

  edit(key: any) {
    this.alarmStg = JSON.parse(JSON.stringify(this.alarmStgList)).filter(t => t.key === key)[0];
    this.option = 'edit';
    this.alarmStgDetail = true;
  }

  search() {
    this.loading = true;
    this.alarmService.alarmStgList().then(res => {
      this.alarmStgList = res;
      if (this.searchValue) {
        this.alarmStgList = JSON.parse(JSON.stringify(this.alarmStgList)).filter(d => {
          return d.name.indexOf(this.searchValue) >= 0 || d.code.indexOf(this.searchValue) >= 0;
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  cancel($event: any) {
    
    if (event) {
      this.alarmStgDetail = false;
    }
    this.searchValue = '';    //清空搜索框
    this.inputFocus = false;  //搜索框失去焦点
    this.getList();
  }

}
