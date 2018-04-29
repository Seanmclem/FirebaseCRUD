import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';


export interface UserData {
  test?: string;
}

@Injectable()
export class FirebaseService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private router: Router
  ) { }


  //Read one
  // result contains.data()
  async readRecord(table, uid){
    let result = this.angularFireStore.doc(`${table}/${uid}`).ref.get()
    .then(doc => {
      debugger;
      if(doc.exists){
        return doc;
      } else{
        return null;
      }
    });

    return await result;
  }

  //WHERE queries
  // ^ https://firebase.google.com/docs/firestore/query-data/queries

  //Read all? will this work?
  async readTable(table){
    this.angularFireStore.collection(`${table}`).ref.get();

  }

  //Delete
  async deleteRecord(table, uid){
    this.angularFireStore.doc(`${table}/${uid}`).ref.delete()
    .then(function(data) {
      console.log("Document successfully deleted!");
      //redirect or something
    })
    .catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

    //Delete
    async deleteRecordRef(docReference) {
      return await docReference.delete();
    }


  //update
  async updateRecord(table, uid, data){
    return this.angularFireStore.doc(`${table}/${uid}`).ref.update(data);
  }

  async updateRecordRef(docReference, data) {
    //let data = docReference.data();
    return await docReference.update(data);
  }


  //set, with uid
  async setRecord(table, uid, data){
  return this.angularFireStore.doc(`${table}/${uid}`).ref.set(data);
  }

  //add to coll
  async createRecord(table, data){
    //coditional model reference?
    return await this.angularFireStore.collection(`${table}`).add(data);
  }

}
