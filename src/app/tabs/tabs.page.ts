import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
    ActionSheetController,
    AlertController,
    IonTabs,
    MenuController,
    ModalController,
    Platform,
    PopoverController
} from '@ionic/angular';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {ToastService} from '../toast.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
    // @ts-ignore
    @ViewChild('tabs') tabs: IonTabs;
    tabsCanGoBack = false;
    tabsParentCanGoBack = false;
    back = false;

    constructor(
        public platform: Platform,
        public native: AppMinimize,
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public menuCtrl: MenuController,
        public actionSheetCtrl: ActionSheetController,
        public popoverCtrl: PopoverController,
        private router: Router,
        private toast: ToastService
    ) {
    }

    ngOnInit(): void {
        this.platform.backButton.subscribe(() => {
            this.tabsCanGoBack = this.tabs.outlet.canGoBack();
            this.tabsParentCanGoBack = this.tabs.outlet.parentOutlet.canGoBack();
            this.androidBackButtonHandle();
        });
    }

    async androidBackButtonHandle() {
        try {
            const alert = await this.alertCtrl.getTop();
            if (alert) {
                alert.dismiss();
                return;
            }
            const action = await this.actionSheetCtrl.getTop();
            if (action) {
                action.dismiss();
                return;
            }
            const popover = await this.popoverCtrl.getTop();
            if (popover) {
                popover.dismiss();
                return;
            }
            const modal = await this.modalCtrl.getTop();
            if (modal) {
                modal.dismiss();
                return;
            }
            const isOpen = await this.menuCtrl.isOpen();
            if (isOpen) {
                this.menuCtrl.close();
                return;
            }
            if (!this.tabsCanGoBack && !this.tabsParentCanGoBack) {
                setTimeout(() => {
                    this.back = false;
                }, 2000);
                if (this.back) {
                    this.native.minimize();
                } else {
                    this.back = true;
                    this.toast.presentToast('再按一次退出');
                }
                return;
            }
        } catch (error) {
        }
    }


}
