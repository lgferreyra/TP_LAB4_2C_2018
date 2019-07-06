import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { PedidoService } from '../_services/pedido.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report-pedido-ventas',
  templateUrl: './report-pedido-ventas.component.html',
  styleUrls: ['./report-pedido-ventas.component.css']
})
export class ReportPedidoVentasComponent implements OnInit {

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
    { data: [], label: 'Operaciones' }
  ];

  //Menos
  public barChartLabelsMenos: Label[] = [];
  public barChartDataMenos: ChartDataSets[] = [
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
    this.pedidoService.reportePedidoVentas(this.form.get("fechaDesde").value, this.form.get("fechaHasta").value + " 23:59:59").subscribe(
      result => {
        console.log(result);
        this.barChartLabelsMas = result.mas.labels;
        this.barChartDataMas = [{ data: result.mas.data, label: 'Operaciones' }];
        this.barChartLabelsMenos = result.menos.labels;
        this.barChartDataMenos = [{ data: result.menos.data, label: 'Operaciones' }];
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
