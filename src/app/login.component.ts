import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import {FormGroup, FormControl, Validators} from '@angular/forms'
import { PasswordValidator } from './passwordValidator'
import { LoginService } from './login.service'
import {Router} from '@angular/router'


@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    form: FormGroup;
    constructor(fb: FormBuilder, private _loginService: LoginService, private _router:Router) {
        this.form = fb.group(
            {
                username: ['', Validators.required],
                password: ['', Validators.compose([Validators.required, PasswordValidator.cannotContainSpace])]
            }
        )
    }

    login() {

        var result = this._loginService.login(this.form.controls['username'].value, this.form.controls['password'].value)
        if(result){
            this.form.controls['password'].setErrors({invalidLogin: false}) //  magic!! how? ? 
            this._router.navigate(['GitHub'])
            // this.form.controls['password'].setErrors({invalidLogin: true}) //  magic!! how? ? 
        }
        // else {
        //     this.form.controls['password'].setErrors({invalidLogin: null})
        // }
        
        
        console.log(this.form.value)
    }
}