import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MesaService } from '../_services/mesa.service';

@Component({
  selector: 'app-report-mesa-importes',
  templateUrl: './report-mesa-importes.component.html',
  styleUrls: ['./report-mesa-importes.component.css']
})
export class ReportMesaImportesComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio : false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{ticks:{beginAtZero : true}, offset : true}] },
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
  
  //datos
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Cantidad' },
    { data: [], label: 'Demorados' }
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
    this.mesaService.reporteMesaImportes(this.form.get("fechaDesde").value, this.form.get("fechaHasta").value + " 23:59:59").subscribe(
      result => {
        console.log(result);
        this.barChartData = result.data;
        this.barChartLabels = result.labels;
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
