import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { PedidoService } from '../_services/pedido.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report-pedido-cancelados',
  templateUrl: './report-pedido-cancelados.component.html',
  styleUrls: ['./report-pedido-cancelados.component.css']
})
export class ReportPedidoCanceladosComponent implements OnInit {

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
      display: false
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)'],
    },
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
    this.pedidoService.reportePedidoCancelados(this.form.get("fechaDesde").value, this.form.get("fechaHasta").value + " 23:59:59").subscribe(
      result => {
        console.log(result);
        this.pieChartData = result.data;
        this.pieChartLabels = result.labels;
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
