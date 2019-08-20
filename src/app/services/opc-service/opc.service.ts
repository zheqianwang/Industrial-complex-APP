import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { DbMgrService } from '../db-mgr/db-mgr.service';
import { ToastService } from 'src/app/toast.service';

@Injectable({
  providedIn: 'root'
})
export class OpcService {

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private dbMgrService: DbMgrService,
    ) { }

  public host='http://10.24.20.71:4000';
  //public host='http://192.168.110.143:4000';
  public insertopcUrl=this.host+'/api/v1/opcua/insert';
  public updateopcUrl=this.host+'/api/v1/opcua/update';
  public getopcUrl=this.host+'/api/v1/opcua/get';
  public deleteopcUrl=this.host+'/api/v1/opcua/delete';

  public influxhandleUrl="/Api/InfluxHandle.ashx";
  public opchandleUrl="/Api/OpcHandle.ashx";
  public loading=false;
  handleError(error: HttpErrorResponse) {
    // if (error.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   this.message.error('An error occurred:'+error.error.message.toString());
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   this.message.error(error.error.message.toString());
    // }
    // this.message.error(error.message);
    this.loading=false;
    // }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
   
    // 数据列表，返回所有的数据。
    getserviceList(): any {
      let data = [];
      return new Promise((resolve, reject) => {
        this.http.get(this.getopcUrl).toPromise().then(res => {
          if (res['status'] && res['data']) {
            data = res['data'];
          }
          resolve(data);
        }, res => {
          // this.message.error(res.error['msg']);
          reject(data);
        });
      });
    }
    // 添加一条记录
    addService(addData): any {
      return new Promise((resolve, reject) => {
        this.http.post(this.insertopcUrl, addData).toPromise().then(res => {
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
    updateService(addData): any {
      return new Promise((resolve, reject) => {
        this.http.post(this.updateopcUrl, addData).toPromise().then(res => {
          if (res['status']) {
            //this.message.success(res['msg']);
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
    deleteService(serveraddress): any {
      return new Promise((resolve, reject) => {
        this.http.post(this.deleteopcUrl, {"serveraddress":serveraddress}).toPromise().then(res => {
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

    startServer(serveraddress:string,serviceList,influxlist):any {
      this.loading=true;
      return new Promise((resolve, reject) => {
        var saveobj=serviceList.filter(d => d.serveraddress === serveraddress);
        var servername=JSON.parse(saveobj[0].servergroup)[0];
        var influx=influxlist.filter(d => d.servername === servername)
        var opcaction = 'startcollect';
        var data = new FormData();
        data.append('opctype', saveobj[0].opctype);
        data.append('opcip', saveobj[0].opchost)
        data.append('serverurl', saveobj[0].serverurl);
        data.append('frequency', saveobj[0].interval);
        data.append('opcaction', opcaction);
        data.append('inhost', influx[0].serverip);
        data.append('inport', influx[0].serverport);
        data.append('username', influx[0].username);
        data.append('password', influx[0].password);
        data.append('database', influx[0].database);
        var opcHandleUrl="http://"+serveraddress+":"+saveobj[0].serverport+this.opchandleUrl;
        var influxHandleUrl="http://"+serveraddress+":"+saveobj[0].serverport+this.influxhandleUrl;
        this.http.post(influxHandleUrl, data, {responseType: 'text'})
        .pipe(
          catchError((err) => this.handleError(err))
        )
        .subscribe(res => {
          var state=res.search("连接错误") != -1 ;
          if(state){
            // this.message.info(res);
            this.toast.presentToast(res);
            this.loading=false;
           reject(null);
          }else{
            this.http.post(opcHandleUrl, data, {responseType: 'text'})
            .subscribe(res => {
                  if (res.indexOf('Error') > -1 || res.indexOf('Exception') > -1) {   //后端代码内部报错也返回200，会在请求成功的结果中
                    // this.message.warning('启动失败');
                    this.toast.errorToast('启动失败');
                    this.loading=false;
                    reject(null);
                  } else {
                    // this.message.success(res);
                    this.toast.presentToast(res);
                    saveobj[0].opcstate="true";//应设置状态变化
                    influx[0].state=influx[0].state+1;
                    this.dbMgrService.updateDbMgr(influx[0]);
                    this.loading=false;
                    resolve(saveobj[0]);
                  }
                }, error1 => { 
                  // this.message.warning('启动失败', error1.error);
                  this.toast.presentToast(`启动失败${error1.error}`,500,'warning');
                  this.loading=false;
                  reject(null);
                });
          }
      
        }, error1 => {
          // this.message.warning('客户端连接失败', error1.error);
          this.toast.presentToast(`客户端连接失败${error1.error}`,500,'warning');
          this.loading=false;
          reject(null);
        }); 
      });
 
    }
    stopServer(serveraddress:string,serviceList,influxlist) :any {
      this.loading=true;
      return new Promise((resolve, reject) => {
        var saveobj=serviceList.filter(d => d.serveraddress === serveraddress);
        var servername=JSON.parse(saveobj[0].servergroup)[0];
        var influx=influxlist.filter(d => d.servername === servername)
        var opcaction = 'stopcollect';
        var data = new FormData();
        data.append('opcaction', opcaction);
        var opcHandleUrl="http://"+serveraddress+":"+saveobj[0].serverport+this.opchandleUrl;
        this.http.post(opcHandleUrl, data, {responseType: 'text'})
        .pipe(
          catchError((err) => this.handleError(err))
        )
        .subscribe(res => {
          if (res.indexOf('Error') > -1 || res.indexOf('Exception') > -1) {   //后端代码内部报错也返回200，会在请求成功的结果中
            // this.message.warning('停止失败');
            this.toast.presentToast('停止失败',500,'warning');
            this.loading=false;
            reject(null);
          } else {
            // this.message.success(res);
            this.toast.presentToast(res);
            saveobj[0].opcstate="false";//应设置状态变化
            if(influx[0].state>0){
              influx[0].state=influx[0].state-1;
              this.dbMgrService.updateDbMgr(influx[0]);
            }
            this.loading=false;
            resolve(saveobj[0]);
          }
        }, error1 => {
          // this.message.warning('客户端连接失败', error1.error);
          this.toast.presentToast(`客户端连接失败${error1.error}`,500,'warning');
          this.loading=false;
          reject(null);
        });
      });
    }
    //查找OPC服务端名称
    searchServer(service):any {
      this.loading=true;
      return new Promise((resolve, reject) => {
        var data = new FormData();
        var opcHandleUrl;
        data.append('opcip',  service.opchost);
        data.append('opctype', service.opctype);
        data.append('opcaction', 'recognition');
        opcHandleUrl="http://"+service.opchost+":"+service.serverport+this.opchandleUrl;
        this.http.post(opcHandleUrl, data, {responseType: 'text'})
        .pipe(
          catchError((err) => this.handleError(err))
        )
        .subscribe(res => {
          // this.message.success("查找成功");
          this.toast.presentToast('查找成功')
          this.loading=false;
          resolve(res);
        }),error1=>{
          // this.message.warning('客户端连接失败', error1.error);
          this.toast.presentToast(`客户端连接失败${error1.error}`,500,'warning');
          this.loading=false;
          reject(null);
        };
      });
    }
    //同步设备
    updateDevicelist(service):any {
      return new Promise((resolve, reject) => {
        var data = new FormData();
        var opcHandleUrl;
        var database=JSON.parse(service.servergroup)[0];
        data.append('serverurl', service.serverurl);
        data.append('opctype', service.opctype);
        data.append('servername', service.servername);
        data.append('serveraddress', service.opchost);
        data.append('database', database);
        data.append('opcaction', 'updatedevice');
        opcHandleUrl="http://"+service.opchost+":"+service.serverport+this.opchandleUrl;
        this.http.post(opcHandleUrl, data, {responseType: 'text'}).subscribe(res => {
          resolve(res);
        }),error1=>{
          // this.message.warning('客户端连接失败', error1.error);
          this.toast.presentToast(`客户端连接失败${error1.error}`,500,'warning');
          reject(null);
        };
      });
    }
     //保持服务端进程存活
     keepServerAlive(service):any {
      return new Promise((resolve, reject) => {
        var data = new FormData();
        var opcHandleUrl;
        data.append('opcaction', 'keepalive');
        opcHandleUrl="http://"+service.opchost+":"+service.serverport+this.opchandleUrl;
        this.http.post(opcHandleUrl, data, {responseType: 'text'}).subscribe(res => {
          resolve(res.toString());
        }),error1=>{
          // this.message.warning('客户端连接失败', error1.error);
          this.toast.presentToast(`客户端连接失败${error1.error}`,500,'warning');
          reject(null);
        };
      });
    }
}
