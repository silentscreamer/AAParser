import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { data } from '../data';
import { barData } from '../barData';
import { DATACANVAS } from '../DATACANVAS'
import { trigger, style, transition, animate, keyframes, state, query, stagger } from '@angular/animations';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('enlarge', [
      state('small', style({
        height: '100px',
        transform: 'translateY(0)',
      })),
      state('large', style({
        height: '200px',
        transform: 'translateY(-300px)',
        background: 'red'
      })),
    ]),
  ]
})
export class HomeComponent implements OnInit {

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

  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string;
  public projects: any[];


  fillData(selectedItem) {
    this.bar = false;
    this.selected = null;
    for (let DATA of DATACANVAS) {
      if (selectedItem == DATA.label) {
        this.selected = DATA.data;
        this.showPie(this.selected);
        break;
      }
    }
  }


  showPie(selecteddata) {
    /* this.width = 600;
    this.height = 400;
    this.type = 'pie2d';
    this.dataFormat = 'json';
    this.dataSource = selecteddata;
    this.enlarge('small'); */
    this.pieChartLabels = ['Processed Business Functions', 'Processed Files', 'Processed Functions'];
    this.pieChartData = selecteddata;
    this.pieChartType = 'pie';

  }


  constructor() { }

  ngOnInit() {
    this.projects = ['AWH', 'RMI'];
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
  actualValue = '';
  enlarge(state) {
    state = (state === 'small' ? 'large' : 'small');

  }


}
