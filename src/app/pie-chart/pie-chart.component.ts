import { Component, OnInit } from '@angular/core';
import { FusionChartsModule } from 'angular4-fusioncharts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  pieChartData:any = 
    
      {
        "chart": {
           "caption":"singleSelect[0]",
            "theme": "ocean"
        },
        "data": [
            {
                "label": "Teenage",
                "value": "1250400"
            },
            {
                "label": "Adult",
                "value": "1463300"
            },
            {
                "label": "Mid-age",
                "value": "1050700"
            },
            {
                "label": "Senior",
                "value": "491000"
            }
        ]
      };
    

  width = 600;
  height = 400;
  type = 'pie3d';
  dataFormat = 'json';
  dataSource = this.pieChartData;


}
