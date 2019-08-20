import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {PopoverPage} from './popover/popover.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab1Page}])
    ],
    declarations: [Tab1Page,PopoverPage],
    entryComponents:[PopoverPage]
})
export class Tab1PageModule {
}
