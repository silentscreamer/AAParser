import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { AppComponent } from './app.component';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { HomeComponent } from './home/home.component';
import { UploadTemplateComponent } from './upload-template/upload-template.component';
import { DownloadSampleComponent } from './download-sample/download-sample.component';
import { StatisticsComponent } from './statistics/statistics.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent },
    { path: 'downloadSample', component: DownloadSampleComponent },
   {path: 'uploadTemplate', component: UploadTemplateComponent},
   {path: 'statictics', component: StatisticsComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { enableTracing: true }),
    ],
    exports: [RouterModule]
})
export class AppRoutesModule { }
