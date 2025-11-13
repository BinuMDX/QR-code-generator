export class FileUtils {
  static downloadBase64Image(base64Data: string, fileName: string = 'qr-code.png') {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = fileName;
    link.click();
  }

  static exportAsSVG(base64Data: string, fileName: string = 'qr-code.svg') {
    const img = new Image();
    img.src = base64Data;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}">
          <image href="${base64Data}" width="${img.width}" height="${img.height}" />
        </svg>`;
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    };
  }

  static exportAsPDF(base64Data: string, fileName: string = 'qr-code.pdf') {
    import('jspdf').then(jsPDF => {
      const pdf = new jsPDF.jsPDF();
      pdf.addImage(base64Data, 'PNG', 15, 20, 80, 80);
      pdf.save(fileName);
    });
  }
}
