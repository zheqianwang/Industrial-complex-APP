import {Injectable} from '@angular/core';
import * as RSA from 'jsencrypt';
import {UrlService} from './url.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RsaService {

  constructor(
    private url: UrlService,
    private http: HttpClient,
  ) {
  }

  //加密登录信息，后台获取key 异步等待
  Encrypt(obj) {
    let encrypt = new RSA.JSEncrypt();
    let data;
    return new Promise((resolve, reject) => {
      this.http.get(this.url.keyUrl).toPromise().then(res => {
        if (res['status'] && res['data']) {
          data = res['data'];
          encrypt.setPublicKey(data);
          let msg=encrypt.encryptLong(obj);
          resolve(msg);
        }
        else {
          reject('')
        }
      }, res => {
        reject('');
      });
    });
  }
}
