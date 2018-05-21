import { Component, OnInit, Directive, ElementRef, ViewChild } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { FileUploader, Headers } from '../../../node_modules/ng2-file-upload';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';


@Component({

  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css',],

})
export class UploadTemplateComponent {
  @ViewChild('text') myId: ElementRef;
  enable: boolean = false;
  myform;
  min: boolean;
  max: boolean;
  inputData;
  require: boolean;
  user: any = { AppIdd: "" }
  constructor() {
    this.myform = new FormGroup({
      AppId: new FormControl('', [
        Validators.required

      ])

    });

  }

  public uploader: FileUploader = new FileUploader({
    url: URL, allowedFileType: ["xls", "xlsx"], headers: <Headers[]>[
      { name: 'Content-Type', value: 'multipart/form-data' }]
  });

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;


  public fileOverBase(e: any): void {

    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  public validateId(user) {
    this.max = false;
    this.min = false;
    this.require = false;
    if (user) {
      if (user.AppIdd.length == 6) {
        this.enable = true;
        console.log(user);
      } else {
        if (user.AppIdd.length == 0) {
          this.require = true;
        }
        if (user.AppIdd.length < 6 && user.AppIdd.length > 0) {
          this.min = true;
        }
        if (user.AppIdd.length > 6) {
          this.max = true;
        }

      }

    }

  }
  setData(data: string) {
    this.inputData = data;
  }

} 
