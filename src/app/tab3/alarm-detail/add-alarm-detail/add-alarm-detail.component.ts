import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-alarm-detail',
  templateUrl: './add-alarm-detail.component.html',
  styleUrls: ['./add-alarm-detail.component.less']
})
export class AddAlarmDetailComponent implements OnInit {
  @Input() selectEditData;
  @Input() option;
  @Input() parentCom;
  @Output() result: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  // 取消、关闭
  close() {
    this.result.emit(true);
  }

}
