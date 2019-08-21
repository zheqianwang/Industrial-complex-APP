import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastService } from '../toast.service';


/**** ********** 以下是测试*********** */
// import { NavController, NavParams } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';  //这三个该引的包还是要引哟！！！
import { stringify } from "qs"; //这个包如果出现三个小点点，说明未安装插件，
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker/ngx";

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
    userLogin = false;    //当前用户的登录状态
    userInformation;    //当前用户的信息

    constructor(
        private router: Router,
        public alertController: AlertController,
        private storage: Storage,
        private toast: ToastService,

        /** ***********以下是测试************* */

        // public navCtrl: NavController, 
        // public navParams: NavParams, 
        private camera: Camera,
        private transfer: FileTransfer,
        private file: File,
        public imagePicker: ImagePicker,
        public alertCtrl: AlertController,

    ) {
        //获取权限
        // this.imagePicker.hasReadPermission().then(result => {
        //     console.log('权限 result = ',result)
        //     if (!result) {
        //         this.imagePicker.requestReadPermission().then(result => {
        //             console.log("读取权限:" + result)
        //         })
        //     }
        // })
    }

    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            header: '',
            message: '确定退出当前账号？',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                    }
                }, {
                    text: '确定',
                    handler: () => {
                        this.logout();
                    }
                }
            ]
        });
        await alert.present();
    }

    ngOnInit() {
        // if (document.cookie) {
        //     console.log('已经登录了');
        // } else {
        //     console.log('暂未登录');
        // }
    }

    //页面展示后 ionic生命周期
    ionViewWillEnter() {
        this.storage.get('isLogin').then((isLogin) => {
            if (isLogin) {
                // console.log('yonghu denglu ------- true ')
                this.storage.get('username').then(res => {
                    res = JSON.parse(res)
                    console.log('user res=', res);
                    if (res) {
                        this.userLogin = res.status;    //当前用户的登录状态
                        this.userInformation = res.data;//当前用户的信息
                    }

                });
            } else {
                console.log('yonghu denglu ------- false ')
            }
        })

        // console.log('执行完 ionViewWillEnter 函数 ')
    }

    logout() {
        document.cookie = '';
        this.storage.remove('username');
        this.storage.remove('token');
        this.storage.remove('key');
        this.storage.set('isLogin', false);
        this.userInformation = '';
        this.userLogin = false;
        this.router.navigate(['/tabs']);
    }

    login() {
        this.router.navigate(['/login']);
    }


    /** *****************   以下用来测试 ******************** */

    path: string = '../assets/img/icon.png';
    access_token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXBpLXJlc291cmNlIl0sInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwiZXhwIjoxNTA5MTk2OTcyLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiOWFmYmIyYWItMzdiYi00MTIyLTg2NDAtY2FmMDc1OTRmOGZkIiwiY2xpZW50X2lkIjoiY2xpZW50MiJ9.bJOpK0UjCI1ym32uerR_jKp4pv8aLaOxnTeK_DBjYZU';
    fileTransfer: FileTransferObject = this.transfer.create();


    avatar = '../assets/img/icon.png';//拍照存储的本地路径
    //打开摄像头
    openCamera() {
        const options: CameraOptions = {
            quality: 90,//相片质量 0 -100
            destinationType: this.camera.DestinationType.DATA_URL, //DATA_URL 是 base64  FILE_URL 是文件路径
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true,      //是否保存到相册
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,  //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择选										择CAMERA : 拍照,
        }
        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.path = base64Image;      //图片的路径（64位编码的路径）

        }, (err) => {
            alert("获取图片失败");      // Handle error
        });
    }
    //文件上传
    upload(str: string) {
        const apiPath = "http://10.24.20.71:9098/assets/deviceImg?" + stringify({ access_token: this.access_token });
        let options: FileUploadOptions = {
            fileKey: 'file',
            // fileName: 'name.jpg',  //文件名称
            fileName: str + '.jpg',
            headers: {},      // 如果要传参数，写这里
            params: {
                maxSize: 5000000,
                modularName: 'CNL',
                allowType: 'jpg;png;pdf;doc;xls;xlsx;docx',
            }
        };
        this.fileTransfer.upload(this.path, apiPath, options)
            .then((data) => {
                alert('data=' + data);
            }, (err) => {
                alert('err=' + err);
            });
    }
    //文件下载
    download() {
        const url = "http://192.168.0.104:9090/api/fms/sys/attach/file/detail?" + stringify({
            fileId: 17161,
            access_token: this.access_token
        });
        this.fileTransfer.download(url, this.file.externalApplicationStorageDirectory + 'Mac.png').then((entry) => {
            alert('download complete: ' + entry.toURL());
        }, (error) => {
            alert('error=' + error);
        });
    }


    // 打开相册
    chooseFromAlbum() {
        // alert('打开相册')
        // const options: ImagePickerOptions = {
        //     maximumImagesCount: 1,
        //     width: 200,
        //     height: 200
        // };
        // this.imagePicker.getPictures(options).then(images => {
        //     alert(' images = ' + images)
        //     if (images.length > 1) {
        //         this.presentAlert();
        //     } else if (images.length === 1) {
        //         alert('Image URI: ' + images[0]);
        //         this.avatar = images[0].slice(7);
        //     }
        // }, error => {
        //     alert('Error: ' + error);
        // });

        const options: CameraOptions = {
            quality: 90,//相片质量 0 -100
            destinationType: this.camera.DestinationType.DATA_URL, //DATA_URL 是 base64  FILE_URL 是文件路径
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true,      //是否保存到相册
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,  //是打开相册  PHOTOLIBRARY : 相册选择选										择CAMERA : 拍照,
        }
        alert("options = " + options);
        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            alert('base64Image = ' + base64Image)
            this.path = base64Image;      //图片的路径（64位编码的路径）

        }, (err) => {
            alert("获取图片失败");      // Handle error
        });
    }

    presentAlert() {
        alert('执行了 presentAlert')
        // let alert = this.alertCtrl.create({title: "上传失败", message: "只能选择一张图片作为头像哦", buttons: ["确定"]});
        // alert.present().then(value => {
        //   return value;
        // });
    }


    // 测试等待异步请求
    async  asyncAwaitFn(str) {
        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(str)
            }, 1000);
        })
    }

    parallel = async () => { //并行执行
        console.time('parallel')
        const parallelOne = this.asyncAwaitFn('string 1');
        const parallelTwo = this.asyncAwaitFn('string 2')

        //直接打印
        console.log(await parallelOne)
        console.log(await parallelTwo)

        console.timeEnd('parallel')

    }
    // this.parallel()


}
