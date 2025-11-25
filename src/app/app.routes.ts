import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Rgst } from './auth/rgst/rgst';
import { Dashmdc } from './pages/mdc/dashmdc/dashmdc';
import { Dashrec } from './pages/rec/dashrec/dashrec';
import { Dashad } from './pages/admin/dashad/dashad';

export const routes: Routes = [
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'rgst',
        component: Rgst,
    },
    { path: '',
      redirectTo: '/login',
      pathMatch: 'full' },
    {
        path: 'medecin',
        component: Dashmdc,
    },
    {
        path: 'receptionniste',
        component: Dashrec,
    },
    {
        path: 'admin',
        component: Dashad,
    },
    
];
