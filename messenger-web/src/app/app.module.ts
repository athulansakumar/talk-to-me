import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { AuthService } from './service/auth.service';
import { ChatService } from './service/chat.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: 'login',  loadChildren: '../login/login.module#LoginModule' },
  { path: 'logout', canActivate: [AuthService], loadChildren: '../login/login.module#LoginModule'},
  { path: 'chat',  component: ChatComponent , canActivate :[AuthService] },
  { path: '' , redirectTo: 'chat' , pathMatch:'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CookieModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    //   , { enableTracing: true } // <-- debugging purposes only
    ),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
      AuthService,
      ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
