import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-empleado-ingresos',
  templateUrl: './report-empleado-ingresos.component.html',
  styleUrls: ['./report-empleado-ingresos.component.css']
})
export class ReportEmpleadoIngresosComponent implements OnInit {

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  form = this.fb.group({
    fechaDesde: [undefined, Validators.required],
    fechaHasta: [undefined, Validators.required]
  });

  results = [];

  ngOnInit() {
  }

  onSubmit() {
    this.userService.getReporteAccesos(this.form.get("fechaDesde").value, this.form.get("fechaHasta").value + " 23:59:59").subscribe(
      result => {
        console.log(result);
        this.results = result;
      },
      error => console.error(error)
    );
  }

  clear(){
    this.form.reset();
    this.results = [];
  }

}
