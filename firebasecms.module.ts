import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { firebaseConfig } from './config';
import { FirebaseService } from './firebase.service';
import { FirebaseAuthService } from './firebase-auth.service';

import { ListProjectsComponent } from './projects/list-projects/list-projects.component';
import { UpdateProjectComponent } from './projects/update-project/update-project.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';

import { ListBlogPostComponent } from './blog/list-blog-post/list-blog-post.component';
import { CreateBlogPostComponent } from './blog/create-blog-post/create-blog-post.component';
import { UpdateBlogPostComponent } from './blog/update-blog-post/update-blog-post.component';
import { DeleteBlogPostComponent } from './blog/delete-blog-post/delete-blog-post.component';
import { FormsModule } from '@angular/forms';
import { UpdateProjectFormComponent } from './projects/update-project/update-project-form/update-project-form.component';
import { UploadComponent } from './shared/upload/upload.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PreviewComponent } from './shared/preview/preview.component';
import { SafeHtmlPipe } from './shared/safe-html-pipe.pipe';




@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig.connection),
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    EditorModule
  ],
  declarations: [
    ListProjectsComponent, 
    UpdateProjectComponent, 
    CreateProjectComponent, 
    DeleteProjectComponent,

    ListBlogPostComponent, 
    CreateBlogPostComponent, 
    UpdateBlogPostComponent, 
    DeleteBlogPostComponent, UpdateProjectFormComponent, UploadComponent, PreviewComponent, SafeHtmlPipe
  ],
  providers: [
    FirebaseService,
    FirebaseAuthService,
    AngularFireAuth //because it's not a module?
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class FirebasecmsModule { }
