import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device-service/device.service';
import { ModalService, ToastService } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-device-template',
  templateUrl: './device-template.component.html',
  styleUrls: ['./device-template.component.less']
})
export class DeviceTemplateComponent implements OnInit {

  loading = false;
  tempDetail = false;
  option = '';
  template;
  nullTemplate = {
    key: null,
    code: null,
    name: null,
    description: null,
    time: null,
    attrs: []
  };
  tempList = [];
  searchValue;
  pageSize = 10;
  currentIndex = 1;
  sizeOption = [5, 10, 20, 50];
  
  inputFocus = false;   //搜索框默认没有焦点

  constructor(
    private deviceService: DeviceService,
    private _modal: ModalService,
    private _toast: ToastService
  ) {
  }


  getList() {
    this.loading = true;
    this.deviceService.deviceTempList().then(res => {
      this.tempList = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  add() {
    this.template = JSON.parse(JSON.stringify(this.nullTemplate));
    this.tempDetail = true;
    this.option = 'new';
  }

  remove(key: any) {
    this.loading = true;
    ModalService.alert('删除', '确定删除?', [
      { text: '取消', onPress: () => this.loading = false },
      {
        text: '确定',
        onPress: () =>
          new Promise(resolve => {
            this.deviceService.removeTemp(key).then(res => {
              this.getList();
              this.loading = false;
              setTimeout(resolve, 1);
              ToastService.success('删除成功！', 1000);
            }, err => {
              this.getList();
              this.loading = false;
              setTimeout(resolve, 1);
              ToastService.fail('删除失败！', 1000);
            });
           
          }),
        style: {
          color: '#ffffff',
          background: '#108ee9'
        }
      }
    ]);

    // this.deviceService.removeTemp(key).then(res => {
    //   this.getList();
    //   this.loading = false;
    // }, err => {
    //   this.getList();
    //   this.loading = false;
    // });
  }

  cancel($event) {
    if (event) {
      this.tempDetail = false;
    }
    this.searchValue = '';    //清空搜索框
    this.inputFocus = false;  //搜索框失去焦点
    this.getList();
  }

  ngOnInit() {
    this.getList();
  }

  search() {
    this.loading = true;
    this.deviceService.deviceTempList().then(res => {
      this.tempList = res;
      if (this.searchValue) {
        this.tempList = JSON.parse(JSON.stringify(this.tempList)).filter(d => {
          return d.name.indexOf(this.searchValue) >= 0 || d.code.indexOf(this.searchValue) >= 0;
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  edit(key: any) {
    this.tempDetail = true;
    this.option = 'edit';
    this.template = JSON.parse(JSON.stringify(this.tempList.filter(t => t.key === key)[0]));
  }
}
