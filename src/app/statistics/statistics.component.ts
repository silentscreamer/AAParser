import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { barData } from '../barData';
import { DATACANVAS } from '../DATACANVAS'
import { trigger, style, transition, animate, keyframes, state, query, stagger } from '@angular/animations';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import * as Chart from 'chart.js';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public selected: any;
  public selectedBar: any;
  bar: boolean = false;
  width;
  height;
  type;
  typebar;
  dataSourcebar;
  dataFormat;
  dataSource;
  activePoints;
  chartData;
  idx;
  lable;
  value;
  chartactive;
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
  appIdStatus:boolean=true;
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string;
  public projects: any[];

  constructor() { 
    this.myform = new FormGroup({
      AppId: new FormControl('', [
        Validators.required

      ])

    });
  }

  ngOnInit() {
    this.projects = ['AWH', 'RMI'];
  }

  fillData(selectedItem) {
    this.bar = false;
    this.selected = null;
    for (let DATA of DATACANVAS) {
      if (selectedItem == DATA.label) {
        this.selected = DATA.data;
        this.appIdStatus=true;
        this.showPie(this.selected);
        break;
      }else{
        this.appIdStatus=false;
      }
    }
  }

  showPie(selecteddata) {

    this.pieChartLabels = ['Processed Business Functions', 'Processed Files', 'Processed Functions'];
    this.pieChartData = selecteddata;
    this.pieChartType = 'pie';

  }

  public chartClicked(e: any): void {
    this.enlarge('small');
    this.activePoints = e;
    if (this.activePoints) {
      this.chartactive = this.activePoints.active;
      for (let c of this.chartactive) {
        this.chartData = c._chart.config.data;
        this.idx = c._index;
      }
      this.lable = this.chartData.labels[this.idx];
      this.value = this.chartData.datasets;
      for (let c of this.value) {
        this.value = c.data[this.idx];
      }
      alert(this.lable + " : " + this.value);
    }
  }
  showBar(selectedBarData) {
    this.width = 600;
    this.height = 400;
    this.typebar = 'column2d';
    this.dataFormat = 'json';
    this.dataSourcebar = selectedBarData;

  }
  
  enlarge(state) {
    state = (state === 'small' ? 'large' : 'small');

  }
  public validateId(user) {
    this.max = false;
    this.min = false;
    this.require = false;
    if (user) {
      if (user.AppIdd.length == 6) {
        this.enable = true;
        console.log(user);
        this.fillData(user.AppIdd);
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


}
