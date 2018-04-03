import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ForgotComponent } from './login/forgot.component';
import { PasswordResetComponent } from './login/password-reset.component';
import { NopagesfoundComponent } from './shared/nopagesfound/nopagesfound.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, data: { title: 'Heroes List' }},
    { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
    { path: 'forgot', component: ForgotComponent },
    { path: 'password-reset/:token', component: PasswordResetComponent },
    { path: '**', component: NopagesfoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(   appRoutes , { useHash: true });
