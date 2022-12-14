import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        new MenuItem(this.l('HomePage'), '', 'home', '/app/home'),

        new MenuItem(this.l('Tenants'), 'Pages.Tenants', 'business', '/app/tenants'),
        new MenuItem(this.l('Users'), 'Pages.Users', 'people', '/app/users'),
        new MenuItem(this.l('Roles'), 'Pages.Roles', 'local_offer', '/app/roles'),
        new MenuItem(this.l('About'), '', 'info', '/app/about'),

        new MenuItem(this.l('Customer'), '', 'people', '/app/customer'),
        new MenuItem(this.l('Project'), '', 'work', '/app/project'),
        new MenuItem(this.l('Category'), '', 'menu', '',[
            new MenuItem(this.l('Position'), '', 'work', '/app/customerpositions'),
            new MenuItem(this.l('Province'), '', 'work', '/app/provinces'),
            new MenuItem(this.l('District'), '', 'work', '/app/districts'),
            new MenuItem(this.l('Ward'), '', 'work', '/app/wards')
        ])
        
    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}
