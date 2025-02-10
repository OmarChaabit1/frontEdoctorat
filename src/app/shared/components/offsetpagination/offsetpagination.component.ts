import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-offsetpagination',
  templateUrl: './offsetpagination.component.html',
  styleUrls: ['./offsetpagination.component.css'],
})
export class OffsetpaginationComponent implements OnInit {
  @Input() itemsCount = 0;
  @Input() itemsPerPage = 0;
  @Output() indexChange = new EventEmitter<number>();
  indexes: number[] = [];
  currentIndex = 1;

  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i <= Math.ceil(this.itemsCount / this.itemsPerPage); i++) {
      this.indexes.push(i);
    }
  }

  /**
   * Click handler for pagination buttons.
   * Emits the offset to render for an
   * index passed to it.
   * @param index number : A zero based index for calculating the offset. to emit
   */
  onClick(index: number) {
    if (index + 1 === this.currentIndex) return;
    this.indexChange.emit(index * this.itemsPerPage);
    this.currentIndex = index + 1;
  }
}
