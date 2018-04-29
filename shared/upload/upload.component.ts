import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() dUrl$: Observable<string>;

  @Output()
  urlChange: EventEmitter<string> = new EventEmitter<string>();

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  @Input() data;

  ngOnChanges(changes: SimpleChanges){
    debugger;
    if(changes.data.currentValue && changes.data.currentValue.clearMainImage){
      debugger;
      this.downloadURL = null;
      this.ref = null;
      this.task = null;
      this.uploadProgress = null;
    }
  }

  constructor(private angularFireStorage: AngularFireStorage) { }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.angularFireStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);//then/catch?
    this.uploadProgress = this.task.percentageChanges();
    this.downloadURL = this.task.downloadURL();
    //may need to broadcast these too?^
    //and clear downloadURL on submit
    this.task.downloadURL().subscribe(res=>{
      debugger;
      this.urlChange.emit(res);
      //need to emit back specific one? ie mainImage
    });
  }
  ngOnInit() {
  }

}
