import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColdComponent } from './cold.component';

import {EMPTY, from, of} from 'rxjs';

import { cold } from 'jasmine-marbles';

describe('ColdComponent', () => {
  let component: ColdComponent;
  let fixture: ComponentFixture<ColdComponent>;

  const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  function search(val) {
    return alphabets.indexOf(val) > -1 ? of(`${val}`) : EMPTY;
  }

  function searchVowels() {
    const vowels = alphabets.filter(s =>
      ['a', 'e', 'i', 'o', 'u'].indexOf(s) > -1
    );
    return from(vowels);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe(' With Values ', () => {
    it('should work with value', () => {
      const result = from(['orange']);
      const expected = cold('(x|)', { x: 'orange' });

      expect(result).toBeObservable(expected);
    });

    it('should work with of operator with Array values', () => {
      const result = of(1, 2, 3);
      const expected = cold('(abc|)', { a: 1, b: 2, c: 3 });

      expect(result).toBeObservable(expected);
    });
  });

  describe('COLD', () => {
    it('can search an alphabet', () => {
      const provided = search('e');
      const expected = cold('(e|)');
      expect(provided).toBeObservable(expected);
    });

    it('can return empty when no value found', () => {
      const provided = search('E');
      const expected = cold('|');
      expect(provided).toBeObservable(expected);
    });

    it('can search vowels', () => {
      const provided = searchVowels();
      const expected = cold('(aeiou|)');
      expect(provided).toBeObservable(expected);
    });
  });
});
