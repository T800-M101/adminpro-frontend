import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';



const routes: Routes = [
    {
        path:'dashboard', 
        component:PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {path:'', component:DashboardComponent, data:{title: 'Dashboard'}},
            {path:'progress', component:ProgressComponent, data:{title: 'Progress'}},
            {path:'grafica1', component:Grafica1Component, data:{title: 'Gráfica 1'}},
            {path:'account-settings', component: AccountSettingsComponent, data:{title: 'Account Settings'}},
            {path:'promesas', component: PromesasComponent, data:{title: 'Promesas'}},
            {path:'rxjs', component: RxjsComponent, data:{title: 'RxJS'}},
            {path:'profile', component: ProfileComponent, data:{title: 'Profile'}},

            // Maintenance routes
            {path:'users', component: UsersComponent, data:{title: 'Application users'}},


            
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PagesRoutingModule {}