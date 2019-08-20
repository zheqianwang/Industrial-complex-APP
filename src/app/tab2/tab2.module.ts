import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Tab2Page} from './tab2.page';
import {PopoverPage} from './popover/popover.page';
import {FormsModule} from '@angular/forms';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { DeviceDetailComponent } from './device-list/device-detail/device-detail.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { DeviceTemplateComponent } from './device-template/device-template.component';
import { TemplateDetailComponent } from './device-template/template-detail/template-detail.component';
import { DeviceListComponent } from './device-list/device-list.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab2Page}]),
        NgZorroAntdMobileModule,
        ColorPickerModule,
       
    ],
    declarations: [
        Tab2Page,
        PopoverPage,
        DeviceDetailComponent,
        DeviceTemplateComponent,
        TemplateDetailComponent,
        DeviceListComponent,
        
    ],
    entryComponents:[PopoverPage]
})
export class Tab2PageModule {
}
