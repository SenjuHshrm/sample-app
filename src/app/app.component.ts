import { TopWordsTable } from './interface/top-words-table';
import { RequestService } from './service/request.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from './interface/response';
import { ValidationMessage } from './interface/validation-message';
import { SampleForm } from './interface/sample-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public sampleForm: FormGroup<SampleForm> = new FormGroup<SampleForm>({
    sampleInput: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })
  public validationMessage: ValidationMessage = {
    sampleInput: [
      { type: 'required', message: 'This field is required' },
      { type: 'minlength', message: 'This field should contain at least 6 characters' },
      { type: 'maxlength', message: 'This field should only have 20 characters at max' },
    ]
  }
  public formValid: string = ''
  public topWords: TopWordsTable[] = []

  constructor(
    private req: RequestService
  ) {}

  ngOnInit(): void { }

  handleSubmit(e: SubmitEvent, form: FormGroup<SampleForm>): void {
    e.preventDefault()
    this.formValid = (form.valid) ? JSON.stringify({ valid: true }) : JSON.stringify({ valid: false });
  }

  handleUrlKeyPress(e: KeyboardEvent): void {
    if(e.code === 'Enter') {
      let value: string = (e.target as HTMLInputElement).value
      if(value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
        this.req.req(value).subscribe({
          next: (response: Response) => {
            this.topWords = this.countWords(response.description)
          }
        })
      }
    }
  }

  countWords(desc: string): TopWordsTable[] {
    let str = desc.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
    let returnObj: TopWordsTable[] = []
    const arr = str.split(' ');
    const map: any = {};
    arr.forEach((word: string) => {
        map[word] = (map[word] || 0) + 1;
    });
    const res = Array.from(Object.keys(map), key => [key, map[key]]);
    res.sort((a, b) => b[1] - a[1]);
    for(let i = 0; i < 10; i++) {
      returnObj.push({
        word: res[i][0],
        occurance: res[i][1]
      })
    }
    return returnObj;
  }
  
}
