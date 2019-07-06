import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MesaService } from '../_services/mesa.service';

@Component({
  selector: 'app-report-mesa-usos',
  templateUrl: './report-mesa-usos.component.html',
  styleUrls: ['./report-mesa-usos.component.css']
})
export class ReportMesaUsosComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio : false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  
  //Mas
  public barChartLabelsMas: Label[] = [];
  public barChartDataMas: ChartDataSets[] = [
    { data: [], label: 'Usos' }
  ];

  //Menos
  public barChartLabelsMenos: Label[] = [];
  public barChartDataMenos: ChartDataSets[] = [
    { data: [], label: 'Usos' }
  ];

  constructor(
    private mesaService: MesaService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  form = this.fb.group({
    fechaDesde: [undefined, Validators.required],
    fechaHasta: [undefined, Validators.required]
  });


  ngOnInit() {
  }

  onSubmit() {
    this.spinner.show();
    this.mesaService.reporteMesaUsos(this.form.get("fechaDesde").value, this.form.get("fechaHasta").value + " 23:59:59").subscribe(
      result => {
        console.log(result);
        this.barChartLabelsMas = result.mas.labels;
        this.barChartDataMas = [{ data: result.mas.data, label: 'Usos' }];
        this.barChartLabelsMenos = result.menos.labels;
        this.barChartDataMenos = [{ data: result.menos.data, label: 'Usos' }];
      },
      error => {
        console.error(error);
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
