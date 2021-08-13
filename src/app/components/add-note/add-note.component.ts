import { Component, OnInit } from '@angular/core';
import Note from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  note: Note = new Note();
  submitted = false;
  messageAdd = '';

  constructor(public noteService: NoteService) { }

  ngOnInit(): void {
    this.messageAdd = '';
  }

  saveNote(): void {
    if (this.note.title == null || this.note.title == '' || this.note.content == null || this.note.content == '') {
      this.messageAdd = '*validar formato de campos requeridos';
    }
    else {
      this.noteService
      .create(this.note).subscribe(res => {
        console.log('Created new item successfully!');
        this.messageAdd = 'Item creado';
        this.submitted = true;
      });
    }
  }

  newNote(): void {
    this.messageAdd = '';
    this.submitted = false;
    this.note = new Note();
  }
}
