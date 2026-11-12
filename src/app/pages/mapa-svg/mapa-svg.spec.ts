import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaSvg } from './mapa-svg';

describe('MapaSvg', () => {
  let component: MapaSvg;
  let fixture: ComponentFixture<MapaSvg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaSvg],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaSvg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
