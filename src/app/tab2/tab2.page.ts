import { Component, OnInit, Input } from '@angular/core';
import { PopoverPage } from './popover/popover.page';
import { PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ResizeSensor } from 'css-element-queries';
import { DeviceService } from '../services/device-service/device.service';
import { ModalService } from 'ng-zorro-antd-mobile';
import { File } from '@ionic-native/file/ngx';  //这三个该引的包还是要引哟！！！
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {stringify} from "qs"; //这个包如果出现三个小点点，说明未安装插件，【鼠标放在小点点上会出现让安装这个包的命令，大家安装以下即可，这个包是用来包装参数的，不是此篇文章的重点】安装以下即可
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';

declare var $: any;
declare var echarts: any; //angular方式引用echarts做循环处理性能奇差 用土方子吧，给个延时

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  thumbStyle = {
    width: '64px',
    height: '64px',
    'backgroundcolor': 'transparent',
    'border-radius': '5px',
  };

  ws: WebSocket;
  @Input() flag;
  deviceList = [];
  loading = false;
  searchValue;
  searchbar = false;
  selectDevice;
  option;//标识进入卡片页面
  viewList;  //显示的device，
  keys: [];
  interval = 1; //默认一秒刷新
  attValue = [];//设备属性（参数）的值
  presetColors = ['#2ecc71', '#e74c3c'];
  dataOptions = [];
  max = 20;
  deviceDetail = false;

  state = {
    open: false
  };
  rotate = 'rotate(0deg)';

  bgc_icon = true;    //切换图标背景色是否显示的标记
  single = true;  // 切换简略/复杂页面的标记
  device;
  userLogin = true;    //当前用户的登录状态

  constructor(
    private popoverController: PopoverController,
    private deviceService: DeviceService,
    private storage: Storage,
    private _modal: ModalService,
    private file: File,
    private camera: Camera,
    private transfer: FileTransfer,
  ) { }

  onOpenChange() {
    this.state.open = !this.state.open;
    if (this.state.open) {
      this.rotate = 'rotate(90deg)';
    } else {
      this.rotate = 'rotate(0deg)';
    }
  }

  initData: Array<any>;
  show: boolean = false;
  showpage = 'sbjk';
  caidandata: Array<any> = [
    {
      value: 'sbjk',
      label: '设备监控'
    },
    {
      value: 'sbmb',
      label: '设备模板',
      isLeaf: true
    },
    {
      value: 'sblb',
      label: '设备列表'
    }
  ];
  caidan(e) {
    e.preventDefault();
    this.show = !this.show;
    if (!this.initData) {
      this.initData = this.caidandata;
    }
  }
  onChange(e) {
    if (e[0] === 'sbjk') {
      // console.log('设备监控')
      this.showpage = 'sbjk';
    } else if (e[0] === 'sbmb') {
      // console.log('设备模板')
      this.showpage = 'sbmb';
    } else if (e[0] === 'sblb') {
      // console.log('设备列表');
      this.showpage = 'sblb';
    }
    this.ngOnInit();
  }


  // 用Popover实现菜单选择功能
  popoverSelect(str: string) {
    if (str === 'sbjk') {
      // console.log('设备监控')
      this.showpage = 'sbjk';
    } else if (str === 'sbmb') {
      // console.log('设备模板')
      this.showpage = 'sbmb';
    } else if (str === 'sblb') {
      // console.log('设备列表');
      this.showpage = 'sblb';
    }
  }

  ngOnInit() {
    console.log('ngOnInit 函数中 deviceList = ', this.deviceList);
  }

  ionViewWillEnter() {
    this.storage.get('isLogin').then((isLogin) => {
      if (isLogin) {
        this.storage.get('username').then(r => {
          if (r && r.status) {
            // console.log('已经登陆了')
            this.getList();
            this.userLogin = true;    //当前用户的登录状态
          } else {
            // 没有登录就不要显示 设备信息，，并且要提示用户去登录，加上登录跳转的连接

            this.userLogin = false;
          }
        });
      } else {
        this.userLogin = false;
        this.deviceList = [];
      }
    })
    // 如果 cookie 不为空 ,就已经说明登陆了
    // if (document.cookie) {

    // } else {

    // }
  }

  refresh() {
    // this.ngOnInit();
    this.getList();
  }

  //获取所有device，后续处理。刷新专用，与页面加载时不同
  getList() {
    this.loading = true;
    this.deviceService.deviceList().then(res => {
      console.log('设备返回值 res = ', res)
      this.loading = false;
      this.deviceList = res.filter(d => d.display);
      this.spliceViewList(this.deviceList);
    },
      err => {
        this.spliceViewList(this.deviceList);
      });
  }

  searchBar() {
    this.searchbar = true;
  }
  cancel() {
    this.searchbar = false;
    this.searchValue = '';

    this.deviceDetail = false;
    this.getList();
  }
  // 搜索
  search() {
    this.deviceService.deviceList().then(res => {
      this.deviceList = res;
      if (this.searchValue) {
        this.deviceList = JSON.parse(JSON.stringify(this.deviceList)).filter(d => {
          return d.name.indexOf(this.searchValue) >= 0 || d.code.indexOf(this.searchValue) >= 0;
        });
      }
      this.spliceViewList(this.deviceList);
    }, err => {
      this.spliceViewList(this.deviceList);
    });
  }
  inCard(key: string) {
    // this.selectDevice = JSON.parse(JSON.stringify(this.deviceList)).filter(d => d.key === key)[0];
    // this.option = 'inCard';

    this.device = JSON.parse(JSON.stringify(this.deviceList)).filter(d => d.key === key)[0];
    this.option = 'edit';
    this.deviceDetail = true;
    this.closeWS();
  }


  // 返回首页
  shouye() {
    this.option = '';
  }

  add() {
    this.option = 'new';
    this.deviceDetail = true;
    // this.closeWS();
  }

  spliceViewList(list) {
    this.viewList = JSON.parse(JSON.stringify(list));
    this.keys = this.viewList.map(d => {
      return d.key;
    });
    this.deviceService.deviceValue(this.keys).then(res => {
      this.attValue = res;
      this.keys.forEach(r => {
        let o = this.dataOptions.filter(d => d['device'] == r)[0] ? this.dataOptions.filter(d => d['device'] == r)[0]['option'] : null;
        let option = o ? o :
          {
            grid: {
              left: '6%',
              right: '6%',
              bottom: '40%',
              top: '0%',
              containLabel: false
            },
            xAxis: {
              max: this.max,
              type: 'value',
              name: 'S',
              show: true
            },
            yAxis: {
              type: 'category',
              show: false,
              data: ['']
            },
            animation: false,
            series: []
          };
        this.dataOptions = [...this.dataOptions, {
          device: r,
          option: option,
        }];
        for (var i = 0; i < this.max - 1; i++) {
          if (option.series.length < this.max) {
            var colorindex = Math.floor(Math.random() + 0.1);
            option.series = [...option.series, {
              type: 'bar',
              stack: '1',
              data: [1],
              itemStyle: {
                normal: {
                  color: this.presetColors[colorindex]
                }
              }
            }];
          }
        }

      });
      this.connectWs();//建立ws协议，自动刷新
      this.matchValue();
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  // 切换简略内容显示/详细内容显示
  // switch() 
  switch() {
    this.bgc_icon = !this.bgc_icon;
    this.single = !this.single;
  }

  // 建立ws协议，自动刷新。
  connectWs() {
    this.closeWS();
    var self = this;
    this.ws = new WebSocket(this.deviceService.wsUrl);
    this.ws.onopen = function (event) {
      self.ws.send(JSON.stringify({
        keys: self.keys,
        time: self.interval
      }));
    };
    this.ws.onmessage = function (event) {
      self.attValue = JSON.parse(event.data);
      self.chartOption();
    };
  }

  matchValue() {
    try {
      this.keys.forEach(c => {
        var e = $('#' + c);
        var chart = echarts.init(e.get(0));
        chart.setOption(this.dataOptions.filter(d => d['device'] == c)[0]['option']);
        new ResizeSensor(e, function () {
          chart.resize();
        });
      });
    } catch (e) {

    }
  }

  closeWS() {
    if (this.ws) {
      this.ws.close();
    }
  }

  //ws收到消息追加数据
  chartOption() {
    this.keys.forEach(r => {
      var option = this.dataOptions.filter(d => d['device'] == r)[0]['option'];
      if (option.series.length >= this.max) {
        option.series.splice(0, 1);
      }
      var colorindex = Math.floor(Math.random() + 0.1);
      option.series = [...option.series, {
        type: 'bar',
        stack: '1',
        data: [1],
        itemStyle: {
          normal: {
            color: this.presetColors[colorindex]
          }
        }
      }];
    });
    this.matchValue();
  }

  //控制显示属性参数
  display(item: any) {
    var display = item.attrs.filter(a => a.display);
    if (display.length > 16) {
      display = display.slice(0, 16);
    }
    return display;
  }
  //设备属性数值
  keyValue(key, att): any {
    if (!this.attValue) {
      return;
    }
    try {
      let data = this.attValue.filter(v => v['device'] === key)[0]['data'];
      if (data) {
        return data.filter(d => d['attcode'] === att)[0]['value'];
      } else {
        return;
      }
    } catch (e) {

    }
  }

  length(item) {
    return this.display(item).length;
  }

  column(item) {
    const length = this.length(item);
    const d = Math.ceil(length / 4);
    if (d <= 2) {
      return 2;
    } else {
      return d;
    }
  }

  row(item) {
    return Math.ceil(this.length(item) / this.column(item));
  }
  width(item, att) {
    var display = this.display(item);
    var tail = display.slice(this.column(item) * (this.row(item) - 1), display.length);
    if (tail.indexOf(att) < 0) {
      return 100 / this.column(item) + '%';
    } else {
      return 100 / tail.length + '%';
    }
  }

  // 点击设备图片显示操作
  showAlertMuchButtons(item) {
    console.log('message =', item)
    ModalService.alert(item.name, '设备图片操作', [
      // { text: '上传', onPress: () => console.log('点击了-上传') },
      { text: '上传', onPress: () => this.uploadMethod() },
      { text: '编辑', onPress: () => console.log('点击了-编辑') },
      { text: '删除', onPress: () => console.log('点击了-删除') },
      { text: '取消', onPress: () => console.log('点击了-取消') },

    ]);
  }
  // 图片上传方式操作
  uploadMethod() {
    ModalService.alert('上传方式', '', [
      { text: '拍照上传', onPress: () => this.openCamera() },
      { text: '打开相册', onPress: () => console.log('点击了-打开相册') },
      { text: '取消', onPress: () => console.log('点击了-取消') },
    ])
  }
  //打开摄像头
  path: string;
  fileTransfer: FileTransferObject = this.transfer.create(); 
  access_token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXBpLXJlc291cmNlIl0sInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwiZXhwIjoxNTA5MTk2OTcyLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOWFmYmIyYWItMzdiYi00MTIyLTg2NDAtY2FmMDc1OTRmOGZkIiwiY2xpZW50X2lkIjoiY2xpZW50MiJ9.bJOpK0UjCI1ym32uerR_jKp4pv8aLaOxnTeK_DBjYZU';
  openCamera() {
    console.log('点击了-拍照上传 - openCamera')
    const options: CameraOptions = {
      quality: 90,//相片质量 0 -100
      destinationType: this.camera.DestinationType.DATA_URL, //DATA_URL 是 base64  FILE_URL 是文件路径
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,      //是否保存到相册
      sourceType: this.camera.PictureSourceType.CAMERA,  //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择选										择CAMERA : 拍照,
    }
    console.log('options = ',options)
    this.camera.getPicture(options).then((imageData) => {
      console.log("got file: " + imageData);      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.path = base64Image;      //If it's file URI
      // this.path = imageData;
      this.upload();
    }, (err) => {
      console.log("获取图片失败 err = ",err);      // Handle error
    });
  }
  //文件上传
  upload() {
    const apiPath = "http://192.168.0.104:9090/api/commons/attach?" + stringify({ access_token: this.access_token });
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',  //文件名称
      headers: {},      // 如果要传参数，写这里
      params: {
        maxSize: 5000000,
        modularName: 'CNL',
        allowType: 'jpg;png;pdf;doc;xls;xlsx;docx',
      }
    };
    this.fileTransfer.upload(this.path, apiPath, options)
      .then((data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      });
  }


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
