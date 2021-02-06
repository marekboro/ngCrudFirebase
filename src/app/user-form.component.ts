import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { User } from './user'
import {CommonModule} from '@angular/common'
import {Observable} from 'rxjs'
import {LogicCheck} from './user-form.logic.checker'
import {LoginService} from './login.service'

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html'
})

export class UserFormComponent {
    id;
    submitionAttempt=false;
    form: FormGroup;
    title: string;
    buttonStatement:string;
    user = new User();

    userDoc:AngularFirestoreDocument<User>;
    singleUser: Observable<User>;

    constructor(fb: FormBuilder, private _router: Router, private afs: AngularFirestore, private _route: ActivatedRoute, private _loginService: LoginService) {
        this.form = fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', !Validators.required],
            numbers: ['', !Validators.required],
            logic: ['',  Validators.compose([ Validators.required, LogicCheck.verifyLogic])]
        })
    }

    ngOnInit(){
        
        this._route.params.subscribe(params => {
            this.id = params["id"]
        })

        if (!this.id) {
            this.title = "New User Form";
            this.buttonStatement="Add user"
        }
        else {
            this.title = "Edit User Form";
            this.buttonStatement="Save user"
            // this.userDoc = this.afs.doc('users/'+this.id);
            this.userDoc = this.afs.doc('users/'+this._loginService.loggedInUser+"/clients/"+this.id);
            this.singleUser = this.userDoc.valueChanges();  // sigleUser is now an observable. 
            this.singleUser.subscribe(user => {             // we subscribe to it, which returns our user in a callback. 
                this.form.get('username').setValue(user.name);
                this.form.get('email').setValue(user.email);
                this.form.get('password').setValue(user.password);
                this.form.get('numbers').setValue(user.numbers);
                this.form.get('logic').setValue(user.logic);
            } )

        }

    }

    submit(){
        this.submitionAttempt = true;
        console.log("submition : " , this.submitionAttempt)
        if (this.id) {
            this.afs.doc('users/'+this._loginService.loggedInUser+"/clients/"+this.id).update({
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                numbers: this.user.numbers,
                logic: this.user.logic
            })
        }
        else {
            this.afs.collection('users')
            .doc(this._loginService.loggedInUser)
            .collection("clients")
            .add({
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                numbers: this.user.numbers,
                logic: this.user.logic
            })
        }
        
        // this.goHome();
        this._router.navigate([''])
        
    }
    goHome(){
        console.log("goHome: dirty:", this.form.dirty)
        this._router.navigate([''])
    }


}