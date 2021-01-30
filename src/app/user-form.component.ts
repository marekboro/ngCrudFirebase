import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { User } from './user'
import {CommonModule} from '@angular/common'

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html'
})

export class UserFormComponent {
    submitionAttempt=false;
    form: FormGroup;
    title: string;
    user = new User();

    constructor(fb: FormBuilder, private _router: Router, private afs: AngularFirestore) {
        this.form = fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', !Validators.required],
            numbers: ['', !Validators.required],
            logic: ['', !Validators.required],
        })
    }

    ngOnInit(){
        this.title = "New User Form"
    }

    submit(){
        this.submitionAttempt = true;
        console.log("submition : " , this.submitionAttempt)
        this.afs.collection('users').add({
            name: this.user.name,
            email: this.user.email,
            password: this.user.password,
            numbers: this.user.numbers,
            logic: this.user.logic
        })
        // this.goHome();
        this._router.navigate([''])
        
    }
    goHome(){
        console.log("goHome: dirty:", this.form.dirty)
        this._router.navigate([''])
    }


}