import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MesaService } from '../_services/mesa.service';

@Component({
  selector: 'app-report-mesa-top-facturacion',
  templateUrl: './report-mesa-top-facturacion.component.html',
  styleUrls: ['./report-mesa-top-facturacion.component.css']
})
export class ReportMesaTopFacturacionComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio : false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks:{beginAtZero : true}}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  
  //Mas
  public barChartLabelsMas: Label[] = [];
  public barChartDataMas: ChartDataSets[] = [
    { data: [], label: 'Facturacion' }
  ];

  //Menos
  public barChartLabelsMenos: Label[] = [];
  public barChartDataMenos: ChartDataSets[] = [
    { data: [], label: 'Facturacion' }
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
    this.mesaService.reporteMesaTopFacturaciones(this.form.get("fechaDesde").value, this.form.get("fechaHasta").value + " 23:59:59").subscribe(
      result => {
        console.log(result);
        this.barChartLabelsMas = result.mas.labels;
        this.barChartDataMas = [{ data: result.mas.data, label: 'Facturacion' }];
        this.barChartLabelsMenos = result.menos.labels;
        this.barChartDataMenos = [{ data: result.menos.data, label: 'Facturacion' }];
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
