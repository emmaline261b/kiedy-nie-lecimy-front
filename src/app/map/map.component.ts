import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
    standalone: true,
    selector: 'app-map',
    imports: [CommonModule, HighchartsChartModule],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss'
})
export class MapComponent {

    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: any = {
        title: {
            text: 'Simple Highcharts Example'
        },
        series: [
            {
                type: 'line',
                data: [1, 3, 2, 4]
            }
        ]
    };

}
