import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRGenerator } from './qr-generator';

describe('QRGenerator', () => {
  let component: QRGenerator;
  let fixture: ComponentFixture<QRGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QRGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
