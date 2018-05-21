import { Component, OnInit,Directive } from '@angular/core';
import { NgClass, NgStyle} from '@angular/common';
import { FileUploader,Headers} from '../../../node_modules/ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';


@Component({
  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css']
})
export class UploadTemplateComponent  {
 
  constructor() { }
  
    public uploader:FileUploader = new FileUploader({url: URL,allowedFileType: ["xls","xlsx"], headers: <Headers[]> [
      { name: 'Content-Type', value: 'multipart/form-data' }]});
  
    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;
  
   
    public fileOverBase(e:any):void {
     
      this.hasBaseDropZoneOver = e;
    }
  
    public fileOverAnother(e:any):void {
      this.hasAnotherDropZoneOver = e;
    }
  } 
