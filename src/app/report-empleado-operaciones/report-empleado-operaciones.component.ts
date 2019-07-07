import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { PedidoService } from '../_services/pedido.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report-empleado-operaciones',
  templateUrl: './report-empleado-operaciones.component.html',
  styleUrls: ['./report-empleado-operaciones.component.css']
})
export class ReportEmpleadoOperacionesComponent implements OnInit {
  
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
  
  //BySector
  public barChartLabelsBySector: Label[] = [];
  public barChartDataBySector: ChartDataSets[] = [
    { data: [], label: 'Operaciones' }
  ];

  //ByEmpleado
  public barChartLabelsByEmpleado: Label[] = [];
  public barChartDataByEmpleado: ChartDataSets[] = [
    { data: [], label: 'Operaciones' }
  ];

  constructor(
    private pedidoService: PedidoService,
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
    this.pedidoService.reporteEmpleadoOperaciones(this.form.get("fechaDesde").value, this.form.get("fechaHasta").value + " 23:59:59").subscribe(
      result => {
        console.log(result);
        this.barChartLabelsBySector = result.bySector.labels;
        this.barChartDataBySector = [{ data: result.bySector.data, label: 'Operaciones' }];
        this.barChartLabelsByEmpleado = result.byEmpleado.labels;
        this.barChartDataByEmpleado = [{ data: result.byEmpleado.data, label: 'Operaciones' }];
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
