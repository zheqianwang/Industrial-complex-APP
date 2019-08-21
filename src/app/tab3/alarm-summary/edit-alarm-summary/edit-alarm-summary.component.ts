import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-edit-alarm-summary',
  templateUrl: './edit-alarm-summary.component.html',
  styleUrls: ['./edit-alarm-summary.component.less']
})
export class EditAlarmSummaryComponent implements OnInit {
  @Input() option: string;
  @Input() selectEditData;
  @Input() parentCom;
  @Output() result: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('传过来的参数 option = ', this.option, 'selectEditData = ', this.selectEditData)
  }

  // 提交
  submit() {
    let data = JSON.parse(JSON.stringify(this.selectEditData));
    switch (this.option) {
      case 'new': //新增
        console.log('新增的数据', this.selectEditData)
        break;
      case 'edit':  //编辑
        console.log('修改后的数据', this.selectEditData)
        break;
      default:
        break;
    }
  }

  // 重置
  reset() {
    // this.selectEditData = [{
    //   deviceid: '',
    //   devicename: '',
    //   sum: null,
    //   timesum: null,
    // }];
  }

  // 关闭
  close() {
    this.result.emit(true);
  }

}
