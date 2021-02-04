import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {AngularFireModule} from '@angular/fire'
import {AngularFireAnalyticsModule} from '@angular/fire/analytics'
import {AngularFirestoreModule} from '@angular/fire/firestore'

import {environment} from '../environments/environment'
import { UserComponent } from './user.component';
import { routing } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';
import { PreventUnsubmittedFormGuard } from './prevent-unsubmitted-form-guard';

import {LoginComponent} from './login.component'
import {LoginService} from './login.service'

import {AngularFireAuth} from '@angular/fire/auth'


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    CommonModule,
    routing
  ],
  providers: [PreventUnsubmittedFormGuard,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
