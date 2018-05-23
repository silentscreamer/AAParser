import { Component, OnInit, Directive, ElementRef, ViewChild } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { FileUploader, Headers } from '../../../node_modules/ng2-file-upload';
import {HttpClient, HttpHeaders, HttpEvent,HttpEventType,HttpRequest ,HttpResponse} from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Input, Output, EventEmitter, HostListener } from '@angular/core';
const URL = 'http://localhost:8080/processAppArea';


@Component({

  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css',],

})
export class UploadTemplateComponent {
  fileItem;
  @ViewChild('text') myId: ElementRef;
  dragAreaClass: string = 'dragarea';
  @Input() projectId: number = 0;
  @Input() sectionId: number = 0;
  @Input() fileExt: string = "XLS,XLSX";
  @Output() uploadStatus = new EventEmitter();


  enable: boolean = false;
  files: Array<FileList> = [];
  myform;
  objectList:boolean=true;
  programList:boolean;
  min: boolean;
  max: boolean;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }
  inputData;
  require: boolean;
  user: any = { AppIdd: "" }
  constructor(private http: HttpClient) {
    this.myform = new FormGroup({
      AppId: new FormControl('', [
        Validators.required

      ])

    });
  
  }
  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
}
@HostListener('dragenter', ['$event']) onDragEnter(event) {
  this.dragAreaClass = "droparea";
  event.preventDefault();
}
@HostListener('dragend', ['$event']) onDragEnd(event) {
  this.dragAreaClass = "dragarea";
  event.preventDefault();
}
@HostListener('dragleave', ['$event']) onDragLeave(event) {
  this.dragAreaClass = "dragarea";
  event.preventDefault();
}
@HostListener('drop', ['$event']) onDrop(event) {   
  this.dragAreaClass = "dragarea";           
  event.preventDefault();
  event.stopPropagation();
  var files = event.dataTransfer.files;
  this.files.push(files);
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
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.files.push(this.selectedFiles);
  }
 
  upload() {
    this.progress.percentage = 0;
 
    
    this.pushFileToStorage(this.files).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    })
 
    this.selectedFiles = undefined
  }
  pushFileToStorage(file:Array<FileList>){
    let formdata: FormData = new FormData();
    formdata.append('appAreaId',this.user.AppIdd);
    formdata.append('projectId','1');

    for(let f of file){
      this.currentFileUpload = f.item(0);
      formdata.append('files', this.currentFileUpload);
    }
 
    const req = new HttpRequest('POST', URL, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
  clean(file){

    const index: number = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
  } else{
    this.files=[];
  }  
   
  }
} 
