import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NoteService } from 'src/app/services/note.service';
import { environment } from 'src/environments/environment';

import { TutorialDetailComponent } from './tutorial-detail.component';

describe('TutorialDetailComponent', () => {
  let component: TutorialDetailComponent;
  let service: NoteService;
  let fixture: ComponentFixture<TutorialDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
      ],
      declarations: [ TutorialDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDetailComponent);
    component = fixture.componentInstance;
    service = component.noteService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
