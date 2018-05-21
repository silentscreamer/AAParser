import { Component, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor() { }

  ngOnInit() {
    this.projects = ['AWH', 'RMI'];
  }



}
