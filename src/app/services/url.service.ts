import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  // hostname = 'http://10.24.20.71';
  // wsHost='ws://10.24.20.71:7777/';
  // wsHost = 'ws://127.0.0.1:7777/';
  // hostname = 'http://127.0.0.1';

  /** **** 本机无线网ip地址 ****** */
  hostname = 'http://10.72.44.111';
  wsHost = 'ws://10.72.44.111:7777/';
  public FileHost='http://10.72.44.111:9098';//文件服务后端

  hostPort = ':9060';
  gafanaUrl = 'http://10.24.20.45:8080/dashboards'; //grafana仪表管理列表
  topoUrl = 'http://10.24.20.71:9099'; //此url配合topo的路由自动跳转，topo主页自动跳转到topo/list  页面路由nginx负责，后台单独启动
  // modelUrl = 'http://10.24.20.42:8800';
  topoHost = 'http://10.24.20.71:9098';//topo后端

  //topo使用的部分代码
  public workUrl = this.topoHost + '/workspace';
  //以下url需与go后台服务的url对应
  //由于后台默认url不跨域，没在代码中开起跨域分享的url基本都报错不允许跨域，实际不是go的跨域处理问题，是url不对应
  public imgUrl = this.topoHost + '/assets/img';
  public saveUrl = this.topoHost + '/assets/img/save';
  public findUrl = this.topoHost + '/assets/img/deviceid';
  public backUrl = this.topoHost + '/assets/img/back';
  public uploadUrl = this.topoHost + '/assets/upload';//上传保存自定义svg文件
  public cusUrl = this.topoHost + '/assets/img/cussvg';//get保存自定义svg文件
  public updateCus = this.topoHost + '/assets/updateCus'; //保存自定义svg关联信息到数据库
  public findName = this.topoHost + '/workspace/findname';//查找同名布局是否已存在
  public codeUrl = this.topoHost + '/code';//最大编号


  keyUrl = this.hostname + this.hostPort + '/rsakey';
  public loginUrl = this.hostname + this.hostPort + '/login';

  public user = this.hostname + this.hostPort + '/user/key';
  public userPhone = this.hostname + this.hostPort + '/phone';
  public allUser = this.hostname + this.hostPort + '/user/all';
  public addUser = this.hostname + this.hostPort + '/user/add';
  public updateUser = this.hostname + this.hostPort + '/user/update';
  public removeUser = this.hostname + this.hostPort + '/user/remove';
  public newPwd = this.hostname + this.hostPort + '/newpwd';
  public authKey = this.hostname + this.hostPort + '/user/authkey';


  public allNotif = this.hostname + this.hostPort + '/notif/all';
  public newNotif = this.hostname + this.hostPort + '/notif/new';
  public removeNotif = this.hostname + this.hostPort + '/notif/remove';
  public updateNotif = this.hostname + this.hostPort + '/notif/update';


  public deviceList = this.hostname + this.hostPort + '/device/all';
  public device = this.hostname + this.hostPort + '/device/key';
  public deviceCode = this.hostname + this.hostPort + '/device/code';
  public deviceName = this.hostname + this.hostPort + '/device/name';
  public removeDevice = this.hostname + this.hostPort + '/device/remove';
  public addDevice = this.hostname + this.hostPort + '/device/add';
  public updateDevice = this.hostname + this.hostPort + '/device/update';
  public deviceValue = this.hostname + this.hostPort + '/device/value';
  public updateDeviceImg = this.hostname + this.hostPort + '/device/updateDeviceImg';


  public tempList = this.hostname + this.hostPort + '/template/all';
  public template = this.hostname + this.hostPort + '/template/key';
  public removeTemp = this.hostname + this.hostPort + '/template/remove';
  public addTemp = this.hostname + this.hostPort + '/template/add';
  public updateTemp = this.hostname + this.hostPort + '/template/update';


  public alarmlist = this.hostname + this.hostPort + '/alarm/all';
  public alarm = this.hostname + this.hostPort + '/alarm/key';


  public alarmStgList = this.hostname + this.hostPort + '/alarmStg/all';
  public updateAlarmStg = this.hostname + this.hostPort + '/alarmStg/update';
  public addAlarmStg = this.hostname + this.hostPort + '/alarmStg/add';
  public findAlarmStg = this.hostname + this.hostPort + '/alarmStg/key';
  public removeAlarmStg = this.hostname + this.hostPort + '/alarmStg/remove';


  // 数据库管理模块的url
  public dbMgrlist = this.hostname + this.hostPort + '/dbMgr/all';  //所有的数据库信息
  public addDbMgr = this.hostname + this.hostPort + '/dbMgr/add';   //添加一条数据库记录
  public updateDbMgr = this.hostname + this.hostPort + '/dbMgr/update';//更新一条数据库记录
  public deleteDbMgr = this.hostname + this.hostPort + '/dbMgr/delete';//删除一条记录
  public serverIp = this.hostname + this.hostPort + '/dbMgr/find';  //查找当前ip的数据库
  public testPing = this.hostname + this.hostPort + '/dbMgr/ping';  //数据库的测试连接


  public modelAll = this.hostname + this.hostPort + '/model/all';
  public modelUpdate = this.hostname + this.hostPort + '/model/update';

  public port = ':9098';
  // public host=window.location.protocol+'//'+window.location.hostname+':'+this.port;
  public host = this.hostname + this.port;


  constructor(
    private router: Router,
    private storage: Storage,
  ) {
  }


  public header(): any {
    return new HttpHeaders({ token: this.token(), user: this.key() });
  }

  //取token
  public token(): any {
console.log('2')
    // 移动端
    // this.storage.get('token').then(token => {
    //   token = JSON.parse(JSON.stringify(token))
    //   return token ? token : ''
    // })

    // PC端
    if (document.cookie) {
      return JSON.parse(document.cookie)['token'];
    } else {
      return;
    }

    // let a = this.storage.get('username');
    // if(a){
    //   return JSON.parse(JSON.stringify(a))['data']['token'];
    // }else{
    //   return;
    // }
  }

  //取用户的key
  public key(): any {
    console.log('3')
    // 移动端
    // this.storage.get('key').then(key => {
    //   key = JSON.parse(JSON.stringify(key))
    //   return key ? key : ''
    // })

    // PC端
    if (document.cookie) {
      return JSON.parse(document.cookie)['key'];
    } else {
      return;
    }
  }

  //token验证不通过即退出
  public logout(res: any): any {
    if (res["status"] == 401) {
      this.router.navigate(['/login']);
    }
  }

}
