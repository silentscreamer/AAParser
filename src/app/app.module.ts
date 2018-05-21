import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import{ BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { AppRoutesModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FusionChartsModule, FusionChartsComponent } from 'angular4-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.zune';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UploadTemplateComponent } from './upload-template/upload-template.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DownloadSampleComponent } from './download-sample/download-sample.component'; 
@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    BarGraphComponent,
    HomeComponent,
    NavBarComponent,
    UploadTemplateComponent,
    StatisticsComponent,
    DownloadSampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    SelectDropDownModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    FusionChartsModule.forRoot(FusionCharts,Charts)

  ],
  providers: [AppRoutesModule,SelectDropDownModule,FusionChartsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
