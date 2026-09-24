import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalContenido } from './modal-contenido';

describe('ModalContenido', () => {
  let component: ModalContenido;
  let fixture: ComponentFixture<ModalContenido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContenido],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalContenido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
