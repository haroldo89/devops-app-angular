import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import Tutorial from 'src/app/models/tutorial';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = new Tutorial();
  submitted = false;
  messageAdd = '';

  constructor(public tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.messageAdd = '';
  }

  saveTutorial(): void {
    if (this.tutorial.title == null || this.tutorial.title == '') {
      this.messageAdd = 'validar formato de campos requeridos';
    }
    else if (this.tutorial.description == null || this.tutorial.description == '') {
      this.messageAdd = 'validar formato de campos requeridos';
    }
    else {
      this.tutorialService.create(this.tutorial).then(() => {
        console.log('Created new item successfully!');
        this.submitted = true;
      });
    }
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = new Tutorial();
  }
}
