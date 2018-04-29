import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Project } from '../../../models/project';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseAuthService } from '../../../firebase-auth.service';
import { FirebaseService } from '../../../firebase.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { QueryDocumentSnapshot, DocumentSnapshot } from '@firebase/firestore-types';

@Component({
  selector: 'update-project-form',
  templateUrl: './update-project-form.component.html',
  styleUrls: ['./update-project-form.component.scss']
})
export class UpdateProjectFormComponent implements OnInit {
  @Input() cuid: string;
  @ViewChild('dataContainer') dataContainer: ElementRef;

  constructor(    
    private angularFireAuth: AngularFireAuth, 
    private router: Router, 
    private angularFireStore: AngularFirestore,
    private formBuilder: FormBuilder,
    private firebaseAuthService: FirebaseAuthService,
    private firebaseService: FirebaseService) { 
  }

  ngOnInit() {
    this.firebaseService.readRecord('projects', this.cuid)
    .then(result => {
      this.model = result.data();
      this.recordRef = result;
      debugger;
      this.loadData(this.model.body);
    })
    .catch(error => {
      debugger;
    });
  }

  public inputToChild: Object;
  recordRef: DocumentSnapshot = null;
  model = new Project;
  submitting: boolean = false;

  errorMessage: string = "";
  successMessage: string = "";


  loadData(data) {
    this.dataContainer.nativeElement.innerHTML = data;
  }

  hideSomethingByClass = (className) => {
    var component = this;
    setTimeout(() =>  {
      var msg = <HTMLElement>document.querySelector(`.${className}`);
      if(msg){
        msg.style.visibility = 'hidden';
      } else {
        component.hideSomethingByClass(className);
      }}, 200);
    }
  
  uploadDone(event){
    this.model.mainImage = event;
    //need to get back specific one? ie mainImage
    //Use scoped service!
  }

  onSubmit(project) {
    debugger;
    this.inputToChild = {clearMainImage:true};
    project.mainImage = this.model.mainImage;

    project = this.cleanObject(project);

    this.submitting = true;
    this.errorMessage = "";
    this.successMessage = "";

    this.firebaseService.updateRecordRef(this.recordRef.ref, this.model).then(result => {
      this.successMessage = "sucessfully updated record";
    }).catch(error =>{
      this.errorMessage = "you got error";
    });
  }

  cleanObject(obj){
    for(var key in obj){
      if(obj[key] == undefined){
        delete obj[key];
      };
    }
    return obj;
  }



}
