import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
    selector: 'line-chart',
    template: `<div style="display: block;">
            <canvas baseChart
                        [datasets]="lineChartData"
                        [labels]="lineChartLabels"
                        [options]="lineChartOptions"
                        [colors]="lineChartColors"
                        [legend]="lineChartLegend"
                        [chartType]="lineChartType"
                        [plugins]="lineChartPlugins"></canvas>
            </div>`
})
export class LineChartComponent implements OnInit {
    public lineChartData: ChartDataSets[] = [
        { data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80], label: 'Sales Analytics', yAxisID: 'y-axis-0' },
        { data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36], label: 'Monthly Earnings' }
    ];
    public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left',
                }
            ]
        },
        annotation: { 
            annotations: [
                /*{
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 'March',
                    borderColor: 'gray',
                    borderWidth: 2,
                    label: {
                        enabled: true,
                        fontColor: 'orange',
                        content: 'LineAnno'
                    }
                },*/
            ],
        },
        plugins: {
            datalabels: {
                display: false,
            },
        }
    };
    public lineChartColors: Color[] = [
        { // blue
            backgroundColor: 'rgba(60, 76, 207, 0.2)',
            borderColor: '#3c4ccf',
            borderCapStyle: "butt",
            pointBackgroundColor: '#fff',
            pointBorderColor: '#3c4ccf',
            pointHoverBackgroundColor: '#3c4ccf',
            pointHoverBorderColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
        },
        { // grey
            backgroundColor: "rgba(235, 239, 242, 0.2)",
            borderColor: "#ebeff2",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "#ebeff2",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#ebeff2",
            pointHoverBorderColor: "#eef0f2",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        }
    ];
    public lineChartLegend = true;
    public lineChartType : ChartType ='line';
    public lineChartPlugins = [pluginAnnotations];

    @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

    constructor() { }

    ngOnInit() {
    }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        //console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        //console.log(event, active);
    }
}