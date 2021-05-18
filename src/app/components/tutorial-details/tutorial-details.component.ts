import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import Tutorial from 'src/app/models/tutorial';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit, OnChanges {

  @Input() tutorial: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = null;
  message = '';

  constructor(public tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }

  updatePublished(status): void {
    this.tutorialService.update(this.currentTutorial.key, { published: status })
      .then(() => {
        this.currentTutorial.published = status;
        this.message = 'El estado fue actualizado con exito!';
      })
      .catch(err => console.log(err));
  }

  updateTutorial(): void {
    if (this.currentTutorial.title == null || this.currentTutorial.title == '') {
      this.message = 'validar formato de campos requeridos'
    } else if (this.currentTutorial.description == null || this.currentTutorial.description == '') {
      this.message = 'validar formato de campos requeridos'
    } else {
      const data = {
        title: this.currentTutorial.title,
        description: this.currentTutorial.description
      };

      this.tutorialService.update(this.currentTutorial.key, data)
        .then(() => this.message = 'El item fue actualizado con exito!')
        .catch(err => console.log(err));
    }


  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.key)
      .then(() => {
        this.refreshList.emit();
        this.message = 'El item fue actualizado con exito!';
      })
      .catch(err => console.log(err));
  }
}
