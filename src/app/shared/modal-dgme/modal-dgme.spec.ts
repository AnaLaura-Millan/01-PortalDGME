import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDgme } from './modal-dgme';

describe('ModalDgme', () => {
  let component: ModalDgme;
  let fixture: ComponentFixture<ModalDgme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDgme],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDgme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
