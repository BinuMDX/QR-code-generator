import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRHistory } from './qr-history';

describe('QRHistory', () => {
  let component: QRHistory;
  let fixture: ComponentFixture<QRHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QRHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
