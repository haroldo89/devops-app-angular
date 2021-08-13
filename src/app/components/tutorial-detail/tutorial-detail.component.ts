import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Note from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-tutorial-detail',
  templateUrl: './tutorial-detail.component.html',
  styleUrls: ['./tutorial-detail.component.css']
})
export class TutorialDetailComponent implements OnInit {

  @Input() note: Note;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentNote: Note = null;
  message = '';
  constructor(public noteService: NoteService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentNote = { ...this.note };
  }

  updatePublished(status): void {
    // this.noteService.update(this.currentNote._id, { published: status })
    //   .then(() => {
    //     this.currentNote.published = status;
    //     this.message = 'El estado fue actualizado con exito!';
    //   })
    //   .catch(err => console.log(err));
  }

  updateTutorial(): void {
    // if (this.currentNote.title == null || this.currentNote.title == '') {
    //   this.message = 'validar formato de campos requeridos'
    // } else if (this.currentNote.content == null || this.currentNote.content == '') {
    //   this.message = 'validar formato de campos requeridos'
    // } else {
    //   const data = {
    //     title: this.currentNote.title,
    //     content: this.currentNote.content
    //   };

    //   this.noteService.update(this.currentNote.key, data)
    //     .then(() => this.message = 'El item fue actualizado con exito!')
    //     .catch(err => console.log(err));
    // }
  }

  deleteTutorial(): void {
    // this.noteService.delete(this.currentNote.key)
    //   .then(() => {
    //     this.refreshList.emit();
    //     this.message = 'El item fue eliminado con exito!';
    //   })
    //   .catch(err => console.log(err));
  }

}
