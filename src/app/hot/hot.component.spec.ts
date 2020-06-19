import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotComponent} from './hot.component';
import {EMPTY, from, of, Subscription} from 'rxjs';
import {share, switchMap} from 'rxjs/operators';
import {cold, hot} from 'jasmine-marbles';
import {SubscriptionLog} from 'rxjs/internal/testing/SubscriptionLog';

describe('HotComponent', () => {
  let component: HotComponent;
  let fixture: ComponentFixture<HotComponent>;

  function convertToUpperCase($alphabets) {
    return $alphabets.pipe(switchMap((s: string) => s.toUpperCase()));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hot', () => {
    it('should create hot observable', () => {
      const given = from([1, 2, 3]).pipe(share());
      const expected = hot('(abc|)', {a: 1, b: 2, c: 3});

      expect(given).toBeObservable(expected);
    });
  });

  describe('hot', () => {
    it('should test subscription on hot observable', () => {
      const provided = hot('-a-^b---c-|');
      expect(provided).toBeObservable(cold('-b---c-|'));
    });

    it('should test subscription on hot observable that never completes', () => {
      const provided = hot('-a-^(bc)--');
      expect(provided).toBeObservable(cold('-(bc)--'));
    });

    it('can convert alphabet to uppercase', () => {
      const alphabets = hot('--a--b--c--d--');
      const provided = convertToUpperCase(alphabets);
      expect(provided).toBeObservable(cold('--A--B--C--D--'));
    });
  });
});
