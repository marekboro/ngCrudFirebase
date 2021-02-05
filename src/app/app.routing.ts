import { RouterModule } from '@angular/router'
import { PreventUnsubmittedFormGuard } from './prevent-unsubmitted-form-guard'
import { UserFormComponent } from './user-form.component'
import { UserComponent } from './user.component'
import { LoginComponent } from './login.component'
import { SignupComponent } from './signup.component'
import { LoginService } from './login.service'
import {AuthGuard} from './auth.guard'

var loginService: LoginService;
// let x = loginService.iAmLoggedIn;
// var routesPermitted = loginService.iAmLoggedIn.value;

var routesPermitted = true;
console.log("hello")

var routes: Object[];
var routesOne: Object[] = [{ path: '', component: UserComponent }, { path: 'login', component: LoginComponent }];
var routesAll: Object[] = [
    { path: '', component: UserComponent , canActivate: [AuthGuard] },
    { path: 'add', component: UserFormComponent, canDeactivate: [PreventUnsubmittedFormGuard], canActivate: [AuthGuard] },
    { path: 'add/:id', component: UserFormComponent , canActivate: [AuthGuard] },
    { path: 'delete/:id', component: UserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/:invalidLoginMessage', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'signup/:invalidLoginMessage', component: SignupComponent }]

routesPermitted ? [routes = routesAll, console.log("")] : routes = routesOne;


export const routing = RouterModule.forRoot(routes)


// export const routing = RouterModule.forRoot([
//     {path: '', component: UserComponent},
//     {path: 'add', component: UserFormComponent, canDeactivate:[PreventUnsubmittedFormGuard]},
//     {path: 'add/:id', component: UserFormComponent},
//     {path: 'delete/:id', component: UserComponent},
//     {path: 'login', component: LoginComponent},
//     {path: 'login/:invalidLoginMessage', component: LoginComponent},
//     {path: 'signup', component: SignupComponent},
//     {path: 'signup/:invalidLoginMessage', component: SignupComponent},
// ]  
// )