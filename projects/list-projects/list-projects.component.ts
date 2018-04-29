import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseAuthService } from '../../firebase-auth.service';
import { FirebaseService } from '../../firebase.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { QueryDocumentSnapshot } from '@firebase/firestore-types';


@Component({
  selector: 'list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit {

  submitting: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";

  private projectsCollection: AngularFirestoreCollection<any>;
  projects: QueryDocumentSnapshot[];


  constructor(
    private angularFireAuth: AngularFireAuth, 
    private router: Router, 
    private angularFireStore: AngularFirestore,
    private formBuilder: FormBuilder,
    private firebaseAuthService: FirebaseAuthService,
    private firebaseService: FirebaseService
  ) { 
    //runs before dom starts to update
    //readTable here?
  }

  public edit(ref){
    this.router.navigate(['/projects/update', ref.id]);
  }

  public delete(docRef){
    this.successMessage = "";
    this.errorMessage = "";

    this.firebaseService.deleteRecordRef(docRef)
    .then(() => {
      this.successMessage = "Successfully deleted project";
    })
    .catch(error =>{
      this.errorMessage = "Delete failed";
    });
  }


  ngOnInit() {
      this.projectsCollection = this.angularFireStore.collection('projects');

      //should sometimes just use value/ref result and just edit-on-change to save database calls below
      //also should probably keep this in a service-value to make it faster to reload
      this.projectsCollection.snapshotChanges().subscribe(data => {
        this.projects = data.map(data => data.payload.doc)
      });
  }

}
