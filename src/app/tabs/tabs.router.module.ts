import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { WelcomeComponent } from '../welcome/welcome.component';


const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tab1',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab1/tab1.module').then(m => m.Tab1PageModule)
                    },
                    {
                        path: 'demo1',
                        loadChildren: () => import('../tab1/demo/demo1/demo1.module').then(m => m.Demo1PageModule),
                        data: { title: '营业收入' }
                    },
                    {
                        path: 'demo2',
                        loadChildren: () => import('../tab1/demo/demo2/demo2.module').then(m => m.Demo2PageModule),
                        data: { title: '利润' }
                    },

                ]
            },
            {
                // 设备
                path: 'tab2',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab2/tab2.module').then(m => m.Tab2PageModule)
                    }
                ]
            },
            {
                path: 'tab3',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../tab3/tab3.module').then(m => m.Tab3PageModule)
                    }
                ]
            },
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../user/user.module').then(m => m.UserPageModule)
                    },
                    { path: 'setting', loadChildren: () => import('../user/setting/setting.module').then(m => m.SettingPageModule) },
                    { path: 'person', loadChildren: () => import('../user/person/person.module').then(m => m.PersonPageModule), },
                    { path: 'about', loadChildren: () => import('../user/about/about.module').then(m => m.AboutPageModule) },
                    { path: 'card', loadChildren: () => import('../user/card/card.module').then(m => m.CardPageModule) },
                    { path: 'profile', loadChildren: () => import('../user/profile/profile.module').then(m => m.ProfilePageModule) },
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/tab1',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
    },
    
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
