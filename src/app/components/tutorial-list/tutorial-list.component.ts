import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { NoteService } from 'src/app/services/note.service';
import Note from 'src/app/models/note';

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.css']
})
export class TutorialListComponent implements OnInit {

  notes$: Note[];
  currentIndex = -1;
  currentNote = null;
  constructor(
    public noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.noteService
      .getAll()
      .subscribe(res => (this.notes$ = res as Note[]));
  }

  setActiveNote(note, index): void {
    this.currentNote = note;
    this.currentIndex = index;
  }

  refreshList(): void {
    this.currentNote = null;
    this.currentIndex = -1;
    this.getNotes();
  }

}
