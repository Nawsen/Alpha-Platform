import {Component} from '@angular/core';
import {IonicPage, LoadingController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage({
  name: 'auth-signin'
})
@Component({
  selector: 'page-signin',
  templateUrl: 'auth.html',
})
export class AuthPage {
  form: FormGroup;
  hasError: boolean;

  constructor(private loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private auth: AuthProvider) {
    this.form = this.formBuilder.group({
      email: ['wannes', Validators.required],
      password: ['test123', Validators.required]
    });
  }

  signIn() {
    const loading = this.loadingCtrl.create({
      content: 'Logging in...'
    });
    loading.present();

    this.auth.signInWithNameAndPassword(this.form.value.email, this.form.value.password)
      .then(() => {
        loading.dismiss();
        // this.navCtrl.setRoot(HomePage);
      }, () => {
        loading.dismiss();
        this.hasError = true;
      });
  }

}
