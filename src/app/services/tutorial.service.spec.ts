import { TestBed } from '@angular/core/testing';

import { TutorialService } from './tutorial.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../../environments/environment';
import Tutorial from '../models/tutorial';


describe('TutorialService', () => {
  let service: TutorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
      ]
    });
    service = TestBed.inject(TutorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Debe llamar el metodo getAll() y retornar los items', ()=>{
    service.getAll().snapshotChanges().subscribe((redes)=> {
      expect(redes.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('guardar un item to Firebase', () => {
    let tutorial = new Tutorial() 
    spyOn(service.tutorialsRef, 'push');
    service.create(tutorial);
    // expect that push was called
    expect(service.tutorialsRef.push).toHaveBeenCalled();
  })

});
