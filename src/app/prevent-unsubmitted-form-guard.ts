import {CanDeactivate} from '@angular/router'

import { UserFormComponent } from './user-form.component'

export class PreventUnsubmittedFormGuard implements CanDeactivate<UserFormComponent> {

    canDeactivate(component: UserFormComponent){
        
        if(component.form.dirty && !component.submitionAttempt){
            console.log("dirty & !submission", component.form.dirty === component.submitionAttempt)
            return confirm(" Form partially filled, are you sure you want to leave now ?")
        }    


        if(component.form.dirty && component.submitionAttempt){
            console.log("dirty & submission", component.form.dirty === component.submitionAttempt)
            return true;
        }
        
        return true;
    }

}