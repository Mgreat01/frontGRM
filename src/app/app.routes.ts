import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Rgst } from './auth/rgst/rgst';

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
];
