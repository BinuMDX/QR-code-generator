import { AfterViewInit, Component, Input } from '@angular/core';
import * as fabric from 'fabric';
import { TemplateData, Template } from '../../services/template';
import { FileUtils } from '../../utils/file-utils';

@Component({
  selector: 'app-qr-designer',
  standalone: false,
  templateUrl: './qr-designer.html',
  styleUrls: ['./qr-designer.scss'],
})
export class QRDesigner implements AfterViewInit {
  @Input() qrImage!: string; // from QR generator
  canvas!: fabric.Canvas;
  selectedTemplate!: TemplateData;
  templates: TemplateData[] = [];

  constructor(public templateService: Template) {}

  ngAfterViewInit(): void {
    this.templates = this.templateService.getTemplates();
    this.loadTemplate(this.templates[0]); // default
  }

  onTemplateSelect(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    const template = this.templateService.getTemplateById(id);

    if (template) {
      this.loadTemplate(template);
    }
  }

  loadTemplate(template: TemplateData) {
    this.selectedTemplate = template;

    this.canvas = new fabric.Canvas('designCanvas', {
      width: template.width,
      height: template.height,
    });

    // Load background
    fabric.Image.fromURL(template.imageUrl).then((bg) => {
      bg.scaleToWidth(template.width);
      bg.scaleToHeight(template.height);

      this.canvas.backgroundImage = bg;
      this.canvas.renderAll();
    });

    // Load QR image
    if (this.qrImage) {
      fabric.Image.fromURL(this.qrImage).then((img) => {
        img.scaleToWidth(150);
        img.set({
          left: template.width / 2 - 75,
          top: template.height / 2 - 75,
          selectable: true,
        });

        this.canvas.add(img);
        this.canvas.renderAll();
      });
    }
  }

  exportDesign(format: 'png' | 'pdf') {
    const dataURL = this.canvas.toDataURL({
      format: 'png',
      quality: 1.0,
      multiplier: 0,
    });

    if (format === 'png') {
      FileUtils.downloadBase64Image(dataURL, 'qr-design.png');
    } else {
      FileUtils.exportAsPDF(dataURL, 'qr-design.pdf');
    }
  }
}
