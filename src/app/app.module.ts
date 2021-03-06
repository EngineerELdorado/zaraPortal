import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { VerifiedPipe } from './verified.pipe';
import { TransactionComponent } from './transaction/transaction.component';
import { RolePipe } from './role.pipe';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SendComponent } from './send/send.component';
import { SettingsComponent } from './settings/settings.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddUserComponent } from './add-user/add-user.component';
import { BoolPipe } from './bool.pipe';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { UserDetailsComponent } from './user-details/user-details.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { AuthGuard } from './auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ChangePinComponent } from './change-pin/change-pin.component';
import { SettingComponent } from './setting/setting.component';
import { LangPipe } from './lang.pipe';
import { SettingDetailsComponent } from './setting-details/setting-details.component';
import { IsAgentPipe } from './is-agent.pipe';
import { UiSwitchModule } from 'ngx-toggle-switch';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoleComponent,
    DashboardComponent,
    NavbarComponent,
    SidenavComponent,
    VerifiedPipe,
    TransactionComponent,
    RolePipe,
    LoginComponent,
    SendComponent,
    SettingsComponent,
    AddUserComponent,
    BoolPipe,
    UserDetailsComponent,
    VerifyCodeComponent,
    ChangePinComponent,
    SettingComponent,
    LangPipe,
    IsAgentPipe,
    SettingDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    InternationalPhoneModule,
    RouterModule,
    UiSwitchModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule,
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule
  ],
  entryComponents: [SendComponent, AddUserComponent, VerifyCodeComponent, ChangePinComponent],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
