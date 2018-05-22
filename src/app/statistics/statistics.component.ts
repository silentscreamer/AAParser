import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { barData } from '../barData';
import { DATACANVAS } from '../DATACANVAS'
import { trigger, style, transition, animate, keyframes, state, query, stagger } from '@angular/animations';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import * as Chart from 'chart.js';

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

  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string;
  public projects: any[];

  constructor() { }

  ngOnInit() {
    this.projects = ['AWH', 'RMI'];
  }

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


}
