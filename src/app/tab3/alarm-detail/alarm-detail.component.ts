import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../../services/alarm-service/alarm.service';
@Component({
  selector: 'app-alarm-detail',
  templateUrl: './alarm-detail.component.html',
  styleUrls: ['./alarm-detail.component.less']
})
export class AlarmDetailComponent implements OnInit {
  alarmList = [];
  loading = false;
  searchValue;
  editFlag = false; //标记是否显示编辑、预览页面
  selectEditData; //选中的编辑、预览数据
  option;
  inputFocus = false;   //搜索框默认没有焦点

  currentIndex = 1;
  pageSize = 10;
  sizeOption = [5, 10, 20, 50];

  //编辑、预览的标记

  constructor(
    private alarmService: AlarmService
  ) { }
  //获取list数据
  getAlarmList() {
    //  将搜索框内容清空
    this.searchValue = '';
    this.loading = true;
    this.alarmService.alarmList().then(res => {
      this.alarmList = res;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
  // 预览
  preview(key) {
    console.log(key);
    this.editFlag = true;

  }
  //编辑or预览
  editOrPreview(key,e) {
    this.selectEditData = JSON.parse(JSON.stringify(this.alarmList)).filter(t => t.key === key);
    this.editFlag = true;
    if(e === 'edit'){
      this.option = 'edit';
    }else if(e === 'preview'){
      this.option = 'preview';
    }
    console.log(' option = ',this.option)
  }

  search() {
    this.loading = true;
    this.alarmService.alarmList().then(res => {
      this.alarmList = res;
      if (this.searchValue) {
        this.alarmList = JSON.parse(JSON.stringify(this.alarmList)).filter(d => {
          return d.name.indexOf(this.searchValue) >= 0 || d.strategy.device.name.indexOf(this.searchValue) >= 0 || d.strategy.attribute.name.indexOf(this.searchValue) >= 0;
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  // 取消
  cancel() {
    this.searchValue = '';    //清空搜索框
    this.inputFocus = false;  //搜索框失去焦点
    this.editFlag = false;
    this.getAlarmList();
  }

  ngOnInit() {
    this.getAlarmList();
  }
}
