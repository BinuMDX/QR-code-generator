import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QRGenerator } from './components/qr-generator/qr-generator';
import { QRDesigner } from './components/qr-designer/qr-designer';
import { QRHistory } from './components/qr-history/qr-history';

const routes: Routes = [
  { path: '', redirectTo: 'generate', pathMatch: 'full' },
  { path: 'generate', component: QRGenerator },
  { path: 'designer', component: QRDesigner },
  { path: 'history', component: QRHistory },
  // add auth routes later: login, signup, profile, dashboard ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
