import { Injectable } from '@angular/core';

export interface TemplateData { 
  id: string;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class Template {
  private templates: TemplateData[] = [
    {
      id: 'flyer',
      name: 'Flyer Template',
      imageUrl: 'assets/templates/flyer-bg.png',
      width: 600,
      height: 800,
    },
    {
      id: 'business',
      name: 'Business Card',
      imageUrl: 'assets/templates/business-card-bg.png',
      width: 500,
      height: 300,
    },
    {
      id: 'poster',
      name: 'Poster',
      imageUrl: 'assets/templates/poster-bg.png',
      width: 800,
      height: 1000,
    },
  ];

  getTemplates(): TemplateData[] {
    return this.templates;
  }

  getTemplateById(id: string): TemplateData | undefined {
    return this.templates.find((t) => t.id === id);
  }
  
}
