import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { QRGenerator } from './components/qr-generator/qr-generator';
import { QRHistory } from './components/qr-history/qr-history';
import { QRPreview } from './components/qr-preview/qr-preview';
import { QRDesigner } from './components/qr-designer/qr-designer';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';

@NgModule({
  declarations: [
    App,
    QRGenerator,
    QRHistory,
    QRPreview,
    QRDesigner,
    Header,
    Sidebar
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
