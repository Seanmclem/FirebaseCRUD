import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
//import { FirebaseService } from './firebase.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseAuthService {
  public user: Observable<firebase.User>; //were private
  public userDetails: firebase.User = null;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
      this.user = angularFireAuth.authState;

      this.user.subscribe(
        (user) => {

          if (user) {
            this.userDetails = user;//why use this?
            console.log(this.userDetails);
            return user;
          } else {
            this.userDetails = null;
            return null;
          }
          
        }
      );
  }


  signInWithTwitter() {
    return this.angularFireAuth.auth.signInWithPopup(
      new firebase.auth.TwitterAuthProvider()
    );
  }


  signInWithFacebook() {
    return this.angularFireAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  signInWithGoogle() {
    return this.angularFireAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signInWithGithub() {
    return this.angularFireAuth.auth.signInWithPopup(
      new firebase.auth.GithubAuthProvider()
    );//    return this.angularFireAuth.auth.signInWithPopup(provider)
  }

  signInRegular(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential( email, password );

    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }


  ///////////////////////
  //Register

  registerRegular(email, password) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }


  //Login Below/////////////////////////////

  //Regular
  async loginRegular(email, password) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }


  isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }


  public logout() {
    debugger;
    this.angularFireAuth.auth.signOut()
    .then((res) => this.router.navigate(['/']));
  }
}
