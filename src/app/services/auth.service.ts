import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public firestore: AngularFirestore,
    public fireauth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password)
      .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['/restaurants']);
          });
          this.setUserData(result.user);
        }).catch((error) => {
          window.alert(error.message);
        });
      
  }

  // Sign up with email/password
  signUp(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail();
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }
  
  // Send email verification when new user sign up
  sendVerificationMail() {
    return this.fireauth.currentUser.then((user) => user.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/auth/verify-email']);
      });
  }

  // Reset forgot password
  forgotPassword(passwordResetEmail: string) {
    return this.fireauth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Un email vous a été envoyé. Verifier votre boîte de réception.');
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  // Return TRUE when user is logged in and email verified
  get isLoggedIn(): Boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  authLogin(provider) {
    return this.fireauth.signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/restaurants']);
        this.setUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth provider
  in Firestore database */
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  signOut() {
    return this.fireauth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/signin']);
    })
  }

}
