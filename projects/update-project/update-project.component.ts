import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  id: number;
  cuid: string;
  constructor(private route: ActivatedRoute) { 
    this.cuid = this.route.snapshot.params.cuid; //+this.etc // (+) converts string 'id' to a number
  }

  ngOnInit() {
  }

}
