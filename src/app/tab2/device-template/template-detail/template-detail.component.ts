import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {NzMessageService} from 'ng-zorro-antd';
import { ToastService } from 'ng-zorro-antd-mobile';
import * as uuid from 'uuid';
import {DeviceService} from '../../../services/device-service/device.service';

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.less']
})
export class TemplateDetailComponent implements OnInit {

  @Input() option: string;
  @Input() template;

  @Output() result: EventEmitter<any> = new EventEmitter();
  loading = false;

  codeRequired = true;
  nameRequired = true;

  constructor(
    // private message: NzMessageService,
    private _toast: ToastService,
    private deviceService: DeviceService,
  ) {
  }

  close() {
    this.result.emit(true);
  }

  ngOnInit() {
    this.addNullAtt();
  }

  //添加设备属性
  addAttr() {
    this.template.attrs = [...this.template.attrs.filter(a => a.key != 'null'), {
      key: uuid.v4(),
      name: null,
      code: null,
      unit: null,
      description: null,
      valuetype: null,
      sum: false
    }];
    this.addNullAtt();
  }

  addNullAtt() {
    this.template.attrs = [...this.template.attrs, {
      key: 'null',
      name: null,
      code: null,
      unit: null,
      description: null,
      valuetype: null,
      sum: false
    }];
  }

  //删除设备属性
  remove(key: any) {
    this.template.attrs = this.template.attrs.filter(a => a.key != key);
  }

  // 检查‘设备编号’、‘设备名称’是否符合格式
  inputChange(str, e) {
    if (e.length <= 0) {
      if (str == '模板编号') {
        this.codeRequired = false;
        this.template['code'] = e;
      } else if (str == '模板名称') {
        this.nameRequired = false;
        this.template['name'] = e;
      }
    } else {
      if (str == '模板编号') {
        this.codeRequired = true;
        this.template['code'] = e;
      } else if (str == '模板名称') {
        this.nameRequired = true;
        this.template['name'] = e;
      }
    }
  }
  inputErrorClick(str, e) {
    ToastService.fail(`${str}` + "不能为空!");
  }

  validate() {
    this.codeRequired = this.template['code'] ? true : false;
    this.nameRequired = this.template['name'] ? true : false;
  }

  submit() {
    this.validate();
    if (this.codeRequired && this.nameRequired) {
      this.loading = true;
      let data = JSON.parse(JSON.stringify(this.template));
      data['attrs'] = data['attrs'].filter(a => a.key != 'null');

      switch (this.option) {
        case 'new':
          this.deviceService.newDeviceTemp(data).then(res => {
            if (res) {
              this.close();
            }
          }, err => {
            this.loading = false;
          });
          break;
        case 'edit':
          this.deviceService.updateTemplate(data).then(res => {
            if (res) {
              this.close();
            }
          }, err => {
            this.loading = false;
          });
          break;
        default:
          this.loading = false;
          break;
      }
    }
  }
}
