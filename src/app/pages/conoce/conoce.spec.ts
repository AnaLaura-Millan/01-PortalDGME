import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Conoce } from './conoce';

describe('Conoce', () => {
  let component: Conoce;
  let fixture: ComponentFixture<Conoce>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conoce],
    }).compileComponents();

    fixture = TestBed.createComponent(Conoce);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
