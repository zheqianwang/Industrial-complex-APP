import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UrlService } from '../url.service';
import { ToastService } from 'src/app/toast.service';

@Injectable({
  providedIn: 'root'
})
export class DbMgrService {

  constructor(
    private http: HttpClient,
    private url: UrlService,
    // private message: NzMessageService,
    private toast: ToastService,
  ) {  }
  
  // 模拟数据
  dataAllServer = [
    {
      servername: "服务器 1",
      serverip: "10.25.12.11",
      serverport: "8000",
      database: "mySQL",
      databasetype: "时序数据库",
      username: "admin",
      password: "admin",
      description: ""
    },
    {
      servername: "服务器 2",
      serverip: "10.25.12.12",
      serverport: "8001",
      database: "mySQL",
      databasetype: "关系数据库",
      username: "test",
      password: "test",
      description: ""
    },
    {
      servername: '服务器 3',
      serverip: "10.25.12.13",
      database: "Oracle",
      serverport: "8002",
      databasetype: "文档数据库",
      username: "admin",
      password: "admin",
      description: ""
    },
    {
      servername: '服务器 4',
      serverip: "10.25.12.14",
      database: "瀚高",
      serverport: "4000",
      databasetype: "时序数据库",
      username: "admin",
      password: "admin",
      description: ""
    },
    {
      servername: '服务器 5',
      serverip: "10.25.12.15",
      database: "Postgres",
      serverport: "8080",
      databasetype: "关系数据库",
      username: "wzq",
      password: "wzq",
      description: ""
    },
    {
      servername: '服务器 6',
      serverip: "10.25.12.16",
      database: "MySQL",
      serverport: "8000",
      databasetype: "文档数据库",
      username: "test",
      password: "test",
      description: ""
    }, {
      servername: '服务器 7',
      serverip: "10.25.12.17",
      database: "MySQL",
      serverport: "9001",
      databasetype: "时序数据库",
      username: "admin1",
      password: "admin1",
      description: ""
    },
    

  ];


  // 数据列表，返回所有的数据。
  dbMgrList(): any {
    let data = [];
    return new Promise((resolve, reject) => {
      this.http.get(this.url.dbMgrlist, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status'] && res['data']) {
          data = res['data'];
        }
        resolve(data);
      }, error => {
        // this.message.error(error.error['msg']);
        this.toast.errorToast(error.error['msg']);
        reject(data);
      });
    });

  }

  // 添加一条记录
  addDbMgr(data): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.addDbMgr, data, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          // this.message.success(res['msg']);
          this.toast.presentToast(res['msg']);
        } else {
          // this.message.error(res['msg']);
          this.toast.errorToast(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        // this.message.error(res.error['msg']);
        this.toast.errorToast(res.error['msg']);
        reject(false);
      });
    });
    
  }
  // 更新一条记录
  updateDbMgr(data:any):any{
    return new Promise((resolve, reject) => {
      this.http.post(this.url.updateDbMgr, data, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          // this.message.success(res['msg']);
          this.toast.presentToast(res['msg']);
        } else {
          // this.message.error(res['msg']);
          this.toast.errorToast(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        // this.message.error(res.error['msg']);
        this.toast.errorToast(res.error['msg']);
        reject(false);
      });
    });

  }

  // 删除一条记录
  deleteDbMgr(serverip): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.deleteDbMgr, {serverip: serverip}, {headers: this.url.header()}).toPromise().then(res => {
        if (res['status']) {
          // this.message.success(res['msg']);
          this.toast.presentToast(res['msg']);
        } else {
          // this.message.error(res['msg']);
          this.toast.errorToast(res['msg']);
        }
        resolve(res['status']);
      }, res => {
        // this.message.error(res.error['msg']);
        this.toast.errorToast(res.error['msg']);
        this.url.logout(res);
        reject(false);
      });
    });

  }


  // 查找对应ip的数据库信息
  findServerIp(serverip: string): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.url.serverIp, {serverip: serverip}, {headers: this.url.header()}).toPromise().then(res => {
        resolve(res);  //status为true时 data为数据库信息，为false时msg为错误信息
      }, res => {
        reject(res);
        this.url.logout(res);
      });
    });
  }

  // 测试数据库的连接
  dbMgrPing(data: any): any {
    // let url = `http://${data.serverip}/ping`;
    // if(data.serverport != ""){
    //   url = `http://${data.serverip} ${data.serverport}/telnet`
    // }
    // this.http.post(url, {headers: this.url.header()}).toPromise().then(res => {
    // }, res => {
    // });

    return new Promise((resolve, reject) => {
      this.http.post(this.url.testPing, data, {headers: this.url.header()}).toPromise().then(res => {
        resolve(res); 
      }, res => {
        reject(res);
        this.url.logout(res);
      });
    });
  }
}
