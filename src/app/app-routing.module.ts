import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { LoginComponent } from './components/login/login.component';
import { TutorialListComponent } from './components/tutorial-list/tutorial-list.component';
import { AddNoteComponent } from './components/add-note/add-note.component';

const routes: Routes = [
  // { path: '', redirectTo: 'front', pathMatch: 'full' },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'tutorial',
    component: TutorialListComponent
  },
  {
    path: 'tutorials',
    component: TutorialsListComponent
  },
  {
    path: 'add',
    component: AddTutorialComponent
  },
  {
    path: 'add-note',
    component: AddNoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const ArrayOfComponents = [TutorialListComponent,
  TutorialsListComponent, AddTutorialComponent, AddNoteComponent]