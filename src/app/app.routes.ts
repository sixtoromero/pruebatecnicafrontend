import { Routes, RouterModule, Router } from '@angular/router';
import { CorrespondenceComponent } from './components/correspondence/correspondence.component';
import { HomeComponent } from './components/home/home.component';


const APP_ROUTES: Routes = [  

    {path: 'home', component: HomeComponent},    
    {path: 'correspondence', component: CorrespondenceComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
  ];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);