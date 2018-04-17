import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ForgotComponent } from './login/forgot.component';
import { PasswordResetComponent } from './login/password-reset.component';


// RUTAS
import { APP_ROUTES  } from './app.routes';

// MODULOS
import { PagesModule } from './pages/pages.module';

// Modulo de servicios
import { ServiceModule } from './services/service.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    ServiceModule,  // MODULO DE SERVICIOS, SE IMPORTA AQUI POR QUE ES GLOBAL
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
