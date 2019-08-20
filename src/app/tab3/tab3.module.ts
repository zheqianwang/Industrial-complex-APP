import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab3Page} from './tab3.page';
import {PopoverPage} from './popover/popover.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { AlarmStrategyListComponent } from './alarm-strategy-list/alarm-strategy-list.component';
import { AlarmSummaryComponent } from './alarm-summary/alarm-summary.component';
import { AlarmDetailComponent } from './alarm-detail/alarm-detail.component';
import { AddAlarmStrategyComponent } from './alarm-strategy-list/add-alarm-strategy/add-alarm-strategy.component';
import { EditAlarmSummaryComponent } from './alarm-summary/edit-alarm-summary/edit-alarm-summary.component';
import { AddAlarmDetailComponent } from './alarm-detail/add-alarm-detail/add-alarm-detail.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab3Page}]),
        NgZorroAntdMobileModule,
        
    ],
    declarations: [
        Tab3Page,
        PopoverPage,
        AlarmStrategyListComponent,
        AlarmSummaryComponent,
        AlarmDetailComponent,
        AddAlarmStrategyComponent,
        EditAlarmSummaryComponent,
        AddAlarmDetailComponent,
    ],
    entryComponents:[PopoverPage]
})
export class Tab3PageModule {
}
