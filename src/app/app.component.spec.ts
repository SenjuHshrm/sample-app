import { TopWordsTable } from './interface/top-words-table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

const testValue: TopWordsTable[] = [
  { word: 'python', occurance: 4 },
  { word: 'the', occurance: 4 },
  { word: 'and', occurance: 4 },
  { word: 'is', occurance: 3 },
  { word: 'in', occurance: 2 },
  { word: 'other', occurance: 2 },
  { word: 'languages', occurance: 2 },
  { word: 'c', occurance: 2 },
  { word: 'was', occurance: 1 },
  { word: 'developed', occurance: 1 }
]

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('test text count', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance

    expect(app.countWords("Python was developed by Guido van Rossum in the late eighties and early nineties at the National Research Institute for Mathematics and Computer Science in the Netherlands. Python is derived from many other languages, including ABC, Modula-3, C, C++, Algol-68, SmallTalk, and Unix shell and other scripting languages. Python is copyrighted. Python source code is now available under the GNU General Public License (GPL)"))
      .toEqual(testValue)
  })

});
