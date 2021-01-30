import {RouterModule} from '@angular/router'
import { PreventUnsubmittedFormGuard } from './prevent-unsubmitted-form-guard'
import { UserFormComponent } from './user-form.component'
import {UserComponent} from './user.component'

export const routing = RouterModule.forRoot([
    {path: '', component: UserComponent},
    {path: 'add', component: UserFormComponent, canDeactivate:[PreventUnsubmittedFormGuard]}
]
    
)