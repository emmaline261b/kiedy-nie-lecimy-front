import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as Highcharts from 'highcharts/highmaps';
import worldMap from '@highcharts/map-collection/custom/world.geo.json';
import {HighchartsChartModule} from 'highcharts-angular';
import {COUNTRIES, Country} from '../shared/country-data';


@Component({
    standalone: true,
    selector: 'app-map',
    imports: [CommonModule, HighchartsChartModule],
    templateUrl: './map.component.html', styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnChanges {
    @Input() catastrophes: {name: string; probability: number | null}[] = [];
    @Input() selectedCountry: Country | undefined;


    Highcharts: typeof Highcharts = Highcharts;
    chart: Highcharts.Chart | undefined; // Deklaracja właściwości `chart`
    chartConstructor = 'mapChart';
    chartOptions: Highcharts.Options = {
        chart: {
            map: worldMap
        }, title: {
            text: ''
        }, mapNavigation: {
            enabled: true, buttonOptions: {
                alignTo: 'spacingBox'
            }
        }, legend: {
            enabled: false
        }, colorAxis: {
            min: 0
        },
        series: [
            {
                type: "map",
                name: "Catastrophes",
                states: {
                    hover: {
                        color: "#BADA55"
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: "{point.name}"
                },
                allAreas: true,
                data: [
                    // Poprawione dane z identyfikatorem kraju
                    ['pl', 1] // 'pl' jako kod Polski, 1 jako wartość do podświetlenia
                ]
            }
        ]
    };


    ngOnChanges(changes: SimpleChanges): void {
        if (changes['catastrophes'] && this.catastrophes) {
            const data: [string, number | null][] = this.catastrophes.map(cat => {
                const country = COUNTRIES.find(c => c.name === cat.name);
                return [country?.name_pl || cat.name, cat.probability];
            });

            const mapSeries = this.chartOptions.series![0] as Highcharts.SeriesMapOptions;
            mapSeries.data = data;

            // Odświeżenie wykresu
            if (this.chart) {
                this.chart.update({
                    series: [mapSeries]
                });
            }
        }
    }


    ngOnInit(): void {
        this.chart = Highcharts.mapChart('container', this.chartOptions);
        this.selectedCountry = COUNTRIES.find(x => x.name === 'Poland');
    }
}
