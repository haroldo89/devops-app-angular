import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import Tutorial from 'src/app/models/tutorial';
import { TutorialService } from 'src/app/services/tutorial.service';
import { environment } from '../../../environments/environment';

import { AddTutorialComponent } from './add-tutorial.component';

describe('AddTutorialComponent', () => {

  let component: AddTutorialComponent;
  let service: TutorialService;
  let fixture: ComponentFixture<AddTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
      ],
      declarations: [AddTutorialComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    service = component.tutorialService
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    // component.tutorial
    expect(component).toBeTruthy();
  });

  it('debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe llamar create() de Add-Tutorial', async(() => {
    let tutorial = new Tutorial();
    tutorial.title = 'example';
    tutorial.description = 'example';
    component.tutorial = tutorial;
    // let createTutoria = spyOn(service, 'create');
    component.tutorialService = service;
    component.saveTutorial();
    service.create(component.tutorial)
    // expect(createTutoria).toHaveBeenCalled()
    expect(component.messageAdd).toEqual('');
    expect(component.submitted).toBeFalsy();
  }))

  it('Debe llamar newTutorial() de Add-Tutorial', async(() => {
    component.newTutorial();
    expect(component.tutorial.title).toEqual('');
    expect(component.submitted).toBeFalsy();
  }))
});