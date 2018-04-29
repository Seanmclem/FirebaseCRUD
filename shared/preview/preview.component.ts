import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

@Input() model: any;


  constructor() { }

  ngOnInit() {
  }

}
