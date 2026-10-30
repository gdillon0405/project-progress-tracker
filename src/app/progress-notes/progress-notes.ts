import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';


@Component({
  imports: [ReactiveFormsModule, JsonPipe, NgIf],
  selector: 'app-progress-notes',
  styleUrl: './progress-notes.css',
  templateUrl: './progress-notes.html',
})
export class ProgressNotes {

  progressNotesForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl('On Track'),
    teamMember: new FormControl(''),
    progressNote: new FormControl('')
  });

  projectCodeError = '';

  private projectCodes: { [key: string]: string } = {
    'PPT101': 'Project Progress Tracker',
    'WEB202': 'Website Redesign',
    'APP303': 'Mobile Application Development',
    'DATA404': 'Data Analytics Dashboard'
  };

  updateProjectName(): void {
    const code = (
  this.progressNotesForm.controls.projectCode.value ?? ''
).trim().toUpperCase();

    const projectNameControl =
      this.progressNotesForm.controls.projectName;

    if (!code) {
      projectNameControl.setValue('');
      this.projectCodeError = '';
      return;
    }

    const projectName = this.projectCodes[code];

    if (projectName) {
      projectNameControl.setValue(projectName);
      this.projectCodeError = '';
    } else {
      projectNameControl.setValue('');
      this.projectCodeError = 'Project code not found.';
    }
  }

}