import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../../environments/environment';

import { NoteService } from './note.service';
import { TokenService } from './token.service';

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      HttpClient,
      TokenService
    });
    service = TestBed.inject(NoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
