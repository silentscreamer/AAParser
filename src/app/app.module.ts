import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { AppRoutesModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UploadTemplateComponent } from './upload-template/upload-template.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DownloadSampleComponent } from './download-sample/download-sample.component';
import { FileService } from '../sevices/FileServices';
import { FileDropDirective, FileUploader, FileSelectDirective } from 'ng2-file-upload';
import {HttpClientModule} from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    BarGraphComponent,
    HomeComponent,
    NavBarComponent,
    UploadTemplateComponent,
    StatisticsComponent,
    DownloadSampleComponent,
    FileDropDirective, FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    SelectDropDownModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    ReactiveFormsModule

  ],

  providers: [AppRoutesModule, SelectDropDownModule, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
