import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Position, Cell, Vector } from 'src/types/mspp-types';

@Component({
  selector: 'mspp-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @Input()
  cells: Cell[][] = []
  @Input()
  adjacencies: Vector[] = []
  @Output()
  cellClicked: EventEmitter<Position> = new EventEmitter<Position>();
  @Output()
  cellRightClicked: EventEmitter<Position> = new EventEmitter<Position>();
  @Output() 
  scrolled = new EventEmitter<number>();


  ngOnInit(): void {
  }

  onCellClicked(rowNumber: number, colNumber: number, $event: MouseEvent): void {
    this.cellClicked.emit({ row: rowNumber, col: colNumber });
  }

  onCellRightClicked(row: number, col: number, $event: MouseEvent): void {
    $event.preventDefault();
    this.cellRightClicked.emit({ row, col });
  }

  onScroll(event: number): void {
    this.scrolled.emit(event);
  }


  getCellContent(cell: Cell): string {
    if (cell.isMarked) {
      return 'X';
    }

    if (cell.isRevealed) {
      if (cell.isMine) {
        return 'M';
      } else if (cell.adjacentMines === 0) {
        return '';
      } else {
        return cell.adjacentMines.toString();
      }
    }

    return '';
  }
}