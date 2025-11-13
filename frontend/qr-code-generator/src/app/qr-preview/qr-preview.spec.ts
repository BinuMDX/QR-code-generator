import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRPreview } from './qr-preview';

describe('QRPreview', () => {
  let component: QRPreview;
  let fixture: ComponentFixture<QRPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QRPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRPreview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
