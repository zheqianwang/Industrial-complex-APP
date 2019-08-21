import {Component} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverPage} from './popover/popover.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    grid = [
        {
            group: '财务分析', children: [
                [{url: 'demo1', title: '营业收入', img: 'u12'},
                    {url: 'demo2', title: '利润', img: 'u32'},
                    {url: '', title: '新签合同', img: 'u16'},
                    {url: '', title: '两金', img: 'u28'},],
                [{url: '', title: '经营现金净流量', img: 'u18'},
                    {url: '', title: '有息负债', img: 'u30'},
                    {url: '', title: '货币资金', img: 'u14'},]
            ]
        },
        {
            group: '供应链', children: [
                [{url: '', title: '主要物资采集量', img: 'u44'},
                    {url: '', title: '物资采集率', img: 'u46'},
                    {url: '', title: '上网采购率', img: 'u48'},
                    {url: '', title: '电子化招标率', img: 'u50'},],
                [{url: '', title: '采购到货', img: 'u60'},
                    {url: '', title: '物资库存', img: 'u32'},
                    {url: '', title: '采购应付', img: 'u14'},
                    {url: '', title: '供应商评价', img: 'u74'},]
            ]
        },
        {
            group: '资产设备', children: [
                [{url: '', title: '设备金额', img: 'u14'},
                    {url: '', title: '设备采购计划完成率', img: 'u44'},
                    {url: '', title: '设备完成率', img: 'u46'},
                    {url: '', title: '设备利用率', img: 'u86'},],
                [{url: '', title: '故障停机率', img: 'u28'},
                    {url: '', title: '设备保养完成率', img: 'u90'},
                ]
            ]
        }, {
            group: '生产交付', children: [
                [{url: '', title: '合同签订', img: 'u120'},
                    {url: '', title: '合同详情', img: 'u122'},
                    {url: '', title: '合同交付', img: 'u124'},
                    {url: '', title: '产品生产进展', img: 'u126'},],
                [{url: '', title: '项目生产进展', img: 'u128'},
                    {url: '', title: '项目生产动态', img: 'u46'},
                ]
            ]
        }, {
            group: '质量分析', children: [
                [{url: '', title: '采购物资合格率', img: 'u120'},
                    {url: '', title: '一次校验合格率', img: 'u122'},
                    {url: '', title: '不合格品', img: 'u124'},
                    {url: '', title: '产品报废', img: 'u126'},],
            ]
        }, {
            group: '成本分析', children: [
                [{url: '', title: '目标成本', img: 'u120'},
                    {url: '', title: '实际成本', img: 'u162'},
                ],
            ]
        },


    ];

    constructor(
        private popoverController:PopoverController
    ) {
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverPage,
            event: ev,
            translucent: true
        });
        return await popover.present();
    }

    doRefresh(event) {
        console.log('Begin async operation 开始异步操作');
    
        setTimeout(() => {
          console.log('Async operation has ended 异步操作已结束');
          event.target.complete();
        }, 2000);
      }


}
