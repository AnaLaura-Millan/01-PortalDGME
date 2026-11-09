import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaDgme } from './mapa-dgme';

describe('MapaDgme', () => {
  let component: MapaDgme;
  let fixture: ComponentFixture<MapaDgme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaDgme],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaDgme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
