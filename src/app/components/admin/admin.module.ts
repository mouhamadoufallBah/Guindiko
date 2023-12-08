import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { SidebarAdminComponent } from './layouts/sidebar-admin/sidebar-admin.component';


@NgModule({
  declarations: [
    MainAdminComponent,
    SidebarAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
