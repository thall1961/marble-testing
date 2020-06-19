import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramComponent } from './diagram.component';
import {throttleTime} from 'rxjs/operators';
import {TestScheduler} from 'rxjs/testing';

describe('DiagramComponent', () => {
  let component: DiagramComponent;
  let fixture: ComponentFixture<DiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const testScheduler = new TestScheduler((actual, expected) => {
    // asserting the two objects are equal
    // e.g. using chai.
    expect(actual).toEqual(expected);
  });

// This test will actually run *synchronously*
  it('generate the stream correctly', () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const e1 =  cold('-a--b--c---|');
      const subs =     '^----------!';
      const expected = '-a-----c---|';

      expectObservable(e1.pipe(throttleTime(3, testScheduler))).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(subs);
    });
  });
});
