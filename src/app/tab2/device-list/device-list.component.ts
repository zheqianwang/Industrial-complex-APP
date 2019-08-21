import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DeviceService} from '../../services/device-service/device.service';
import {OpcService} from '../../services/opc-service/opc.service';
// import {NzMessageService} from 'ng-zorro-antd';
import { ModalService } from 'ng-zorro-antd-mobile';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.less']
})
export class DeviceListComponent implements OnInit, OnChanges {

  @Input() flag;
  deviceDetail = false;
  loading = false;
  device;
  deviceList = [];
  searchValue;

  option;
  currentIndex = 1;
  pageSize = 10;
  sizeOption = [5, 10, 20, 50];

  inputFocus = false;   //搜索框默认没有焦点

  constructor(
    private deviceService: DeviceService,
    private OpcService: OpcService,
    // private message: NzMessageService,
    private _modal: ModalService,
    private toast: ToastService,
  ) {
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.deviceService.deviceList().then(res => {
      this.deviceList = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  search() {
    this.loading = true;
    this.deviceService.deviceList().then(res => {
      this.deviceList = res;
      if (this.searchValue) {
        this.deviceList = JSON.parse(JSON.stringify(this.deviceList)).filter(d => {
          return d.name.indexOf(this.searchValue) >= 0 || d.code.indexOf(this.searchValue) >= 0 || d.type.indexOf(this.searchValue) >= 0;
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  //同步设备列表
  synchro() {
    this.loading = true;
    this.OpcService.getserviceList().then(res => {
      var serviceList = res;
      serviceList.forEach(element => {
        this.OpcService.updateDevicelist(element).then(res => {

        }, err => {
          // ToastService.fail('同步失败');
          this.toast.errorToast('同步失败');
          this.loading = true;
        });
      });
      setTimeout(() => { this.getList(); }, 2000);
      // ToastService.success('同步成功');
      this.toast.presentToast('同步成功');
    }, err => {
      this.loading = false;
    });
  }

  add() {
    // this.device = JSON.parse(JSON.stringify(this.nullDevice));
    this.option = 'new';
    this.deviceDetail = true;
  }

  remove(key: any) {
    this.loading = true;
    ModalService.alert('删除', '确定删除?', [
      { text: '取消', onPress: () => this.loading = false },
      {
        text: '确定',
        onPress: () =>
          new Promise(resolve => {
            this.deviceService.removeDevice(key).then(res => {
              this.getList();
              this.loading = false;
              setTimeout(resolve, 1);
              // ToastService.success('删除成功！', 1000);
              this.toast.presentToast('删除成功',1000)
            }, err => {
              this.getList();
              this.loading = false;
              setTimeout(resolve, 1);
              // ToastService.fail('删除失败！', 1000);
              this.toast.errorToast('删除失败',1000)
            });
           
          }),
        style: {
          color: '#ffffff',
          background: '#108ee9'
        }
      }
    ]);

    // this.deviceService.removeDevice(key).then(res => {
    //   this.getList();
    // }, err => {
    //   this.getList();
    // });
  }

  edit(key: any) {
    this.device = JSON.parse(JSON.stringify(this.deviceList)).filter(t => t.key === key)[0];
    this.option = 'edit';
    this.deviceDetail = true;
  }

  cancel($event: any) {
    if (event) {
      this.deviceDetail = false;
    }
    this.searchValue = '';    //清空搜索框
    this.inputFocus = false;  //搜索框失去焦点
    this.getList();
  }

  save(data: any) {
    this.loading = true;
    this.deviceService.updateDevice(data).then(res => {
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.deviceDetail) {
      this.getList();
    }
  }
}
