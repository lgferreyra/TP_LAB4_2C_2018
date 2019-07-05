import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { PedidoService } from '../_services/pedido.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-empleado-operaciones',
  templateUrl: './report-empleado-operaciones.component.html',
  styleUrls: ['./report-empleado-operaciones.component.css']
})
export class ReportEmpleadoOperacionesComponent implements OnInit {
  
  public bySectorLabels = [];
  public bySectorData = [];
  
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = this.bySectorLabels;
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: this.bySectorData, label: 'Operaciones' }
  ];

  constructor(
    private pedidoService: PedidoService,
    private fb: FormBuilder
  ) { }

  form = this.fb.group({
    fechaDesde: [undefined, Validators.required],
    fechaHasta: [undefined, Validators.required]
  });


  ngOnInit() {
  }

  onSubmit() {
    this.pedidoService.reporteEmpleadoOperaciones(this.form.get("fechaDesde").value, this.form.get("fechaHasta").value + " 23:59:59").subscribe(
      result => {
        console.log(result);
        this.bySectorLabels = result.labels;
        this.bySectorData = result.data;

        this.barChartLabels = this.bySectorLabels;
        this.barChartData = [{ data: this.bySectorData, label: 'Operaciones' }];
      },
      error => console.error(error)
    );
  }

  clear(){
    this.form.reset();
    this.bySectorLabels = [];
    this.bySectorData = [];
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
