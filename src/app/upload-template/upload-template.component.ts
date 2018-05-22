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
const URL = 'http://localhost:8080/processAppArea';


@Component({

  selector: 'app-upload-template',
  templateUrl: './upload-template.component.html',
  styleUrls: ['./upload-template.component.css',],

})
export class UploadTemplateComponent {
  fileItem;
  @ViewChild('text') myId: ElementRef;
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

  public uploader: FileUploader = new FileUploader({
    url: URL, allowedFileType: [],disableMultipart :false ,headers: <Headers[]>[
      { name: 'Content-Type', value: 'multipart/form-data' }
    ]  
  });

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;


  public fileOverBase(e: any): void {

    this.hasBaseDropZoneOver = e;
    if(this.uploader.queue.length<2){
      this.uploader.setOptions({allowedFileType:["xls","xlsx"]});
    }
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
    if(this.uploader.queue.length==2){
      this.uploader.setOptions({allowedFileType:[]});
    }
    
  }

  public validateId(user) {
    this.max = false;
    this.min = false;
    this.require = false;
    if (user) {
      if (user.AppIdd.length == 6) {
        this.enable = true;
        this.uploader.setOptions({allowedFileType:["xls","xlsx"]});
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
    if(this.files.length!=0){
      this.objectList=false;
      this.programList=true;    
    }
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
    if(this.files.length==1&&this.objectList){
      this.programList=true;
    }else{
      this.objectList=true;
    }
    if(index==0){
      this.objectList=true;
      this.programList=false;
    }else{
      this.programList=true;
      this.objectList=false;
    }
    if(this.files.length==1){
      this.files=[];
    }else{
      this.files= this.files.splice(index-1,1);
    }
   
  }
} 
