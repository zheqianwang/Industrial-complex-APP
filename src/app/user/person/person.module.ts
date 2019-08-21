import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {PersonPage} from './person.page';
import { PhoneComponent } from './modify/phone/phone.component';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';
import { PasswordComponent } from './modify/password/password.component';

const routes: Routes = [
    {
        path: '',
        component: PersonPage,
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        NgZorroAntdMobileModule,
    ],
    declarations: [
        PersonPage,
        PhoneComponent,
        PasswordComponent,
    ]
})
export class PersonPageModule {
}
