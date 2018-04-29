import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseAuthService } from '../../firebase-auth.service';
import { FirebaseService } from '../../firebase.service';
import { visitProjectedRenderNodes } from '@angular/core/src/view/util';

@Component({
  selector: 'create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {



  constructor(
    private angularFireAuth: AngularFireAuth, 
    private router: Router, 
    private angularFireStore: AngularFirestore,
    private formBuilder: FormBuilder,
    private firebaseAuthService: FirebaseAuthService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
  }
  createProjectForm: FormGroup; 
  public inputToChild: Object;
  model = new Project;
  submitting: boolean = false;

  errorMessage: string = "";
  successMessage: string = "";

  uploadDone(event){
    this.model.mainImage = event;
    //need to get back specific one? ie mainImage
  }

  onSubmit(project) {
    debugger;
    this.inputToChild = {clearMainImage:true};
    project.mainImage = this.model.mainImage;

    project = this.cleanObject(project);

    this.submitting = true;
    this.errorMessage = "";
    this.successMessage = "";

    this.firebaseService.createRecord('projects', project).then(result => {
      this.model = new Project;
      this.successMessage = "sucessfully created new";
    }).catch(error =>{
      this.errorMessage = `you got error: ${error.message}`;
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