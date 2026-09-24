import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Direcciones } from './direcciones';

describe('Direcciones', () => {
  let component: Direcciones;
  let fixture: ComponentFixture<Direcciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Direcciones],
    }).compileComponents();

    fixture = TestBed.createComponent(Direcciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
