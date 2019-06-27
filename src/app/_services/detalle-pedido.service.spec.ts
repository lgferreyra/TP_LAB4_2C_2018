import { TestBed } from '@angular/core/testing';

import { DetallePedidoService } from './detalle-pedido.service';

describe('DetallePedidoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetallePedidoService = TestBed.get(DetallePedidoService);
    expect(service).toBeTruthy();
  });
});
