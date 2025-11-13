import { Component, OnInit } from '@angular/core';
import { History } from '../services/history';

@Component({
  selector: 'app-qr-history',
  standalone: false,
  templateUrl: './qr-history.html',
  styleUrl: './qr-history.scss',
})
export class QRHistory implements OnInit {
  history: any[] = [];

  constructor(private historyService: History) {}

  ngOnInit() {
    this.history = this.historyService.getHistory();
  }

  clearHistory() {
    this.historyService.clearHistory();
    this.history = [];
  }


}
