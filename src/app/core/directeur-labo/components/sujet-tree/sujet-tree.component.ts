import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sujet } from 'src/app/models/Sujet';

@Component({
  selector: 'app-sujet-tree',
  templateUrl: './sujet-tree.component.html',
  styleUrls: ['./sujet-tree.component.css']
})
export class SujetTreeComponent implements OnInit {

  @Input() profNom: String
  @Input() sujets: Sujet[]
  @Input() selectedSujetsIds: number[]
  @Output() sujetClicked: EventEmitter<Sujet> = new EventEmitter()
  expand = false

  constructor() { }

  ngOnInit(): void {
  }

  onExpandToggle() {
    this.expand = !this.expand
  }

  onSujetClick(s: Sujet) {
    this.sujetClicked.emit(s)
  }

}
