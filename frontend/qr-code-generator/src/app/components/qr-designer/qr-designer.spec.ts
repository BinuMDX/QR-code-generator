import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRDesigner } from './qr-designer';

describe('QRDesigner', () => {
  let component: QRDesigner;
  let fixture: ComponentFixture<QRDesigner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QRDesigner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRDesigner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
