import { Component, ElementRef, Renderer, OnInit } from '@angular/core';
import { PopoverPage } from './popover/popover.page';
import { PopoverController } from '@ionic/angular';
import { AlarmService } from '../services/alarm-service/alarm.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  constructor(
    private popoverController: PopoverController,
    private alarmService: AlarmService,
    private _element: ElementRef,
    private _renderer: Renderer,
    private storage: Storage,
  ) { }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  userLogin = true;    //当前用户的登录状态
  inputFocus = false;   //搜索框默认没有焦点

  flag = true;
  index = 1;

  onChange(item) {
    // console.log('onChange', item);
  }

  onTabClick(item) {
    // console.log('onTabClick', item);
  }

  selectCard(e) {
    // console.log(' ', JSON.stringify(e));
  }

  changeIndex() {
    this.index = 0;
  }

  alarmList = [];
  loading = false;
  searchValue;
  editFlag = false; //标记是否显示编辑、预览页面
  selectEditData; //选中的编辑、预览数据
  option;

  currentIndex = 1;
  pageSize = 10;
  sizeOption = [5, 10, 20, 50];


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
    // console.log(key);
    this.editFlag = true;

  }
  //编辑or预览
  editOrPreview(key, e) {
    this.selectEditData = JSON.parse(JSON.stringify(this.alarmList)).filter(t => t.key === key);
    this.editFlag = true;
    if (e === 'edit') {
      this.option = 'edit';
    } else if (e === 'preview') {
      this.option = 'preview';
    }
    // console.log(' option = ',this.option)
  }

  // countries: string[] = new Array("USA", "Germany", "UK", "Russia");
  // Change(event: any): void {
  //   console.log('change event=', event)
  //   console.log('', this.mySearch.val())
  // }
  // Close(event: any): void {
  //   console.log('close event=', event)
  // }
  // Open(event: any): void {
  //   console.log('open event=', event)
  // }
  // Select(event: any): void {
  //   console.log('select event=', event)
  // 

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
    // this.getAlarmList();

  }

  ionViewWillEnter() {
    // this.storage.get('isLogin').then((isLogin) => {
    //   if (isLogin) {
    //     this.storage.get('username').then(r => {
    //       if (r && r.status) {
    //         // console.log('已经登陆了')
    //         this.getAlarmList();
    //         this.userLogin = true;    //当前用户的登录状态
    //       } else {
    //         // 没有登录就不要显示 预警信息，，并且要提示用户去登录，加上登录跳转的连接
    //         this.userLogin = false;
    //       }
    //     });
    //   } else {
    //     this.userLogin = false;
    //     this.alarmList = [];
    //   }
    // })


    this.storage.get('isLogin').then(res => {
      if(res){
        this.getAlarmList();
        this.userLogin = true;
      }else{
        this.userLogin = false;
        this.alarmList = [];
      }
    }, err => {
      console.log('err= ',err)
    })
    
    
    
  }

}
