import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NoteService } from 'src/app/services/note.service';
import { environment } from 'src/environments/environment';

import { TutorialListComponent } from './tutorial-list.component';

describe('TutorialListComponent', () => {
  let component: TutorialListComponent;
  let service: NoteService;
  let fixture: ComponentFixture<TutorialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
      ],
      declarations: [ TutorialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialListComponent);
    component = fixture.componentInstance;
    service = component.noteService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
