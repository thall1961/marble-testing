import {interval} from 'rxjs';
import {map, share} from 'rxjs/operators';

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-hot',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.sass']
})
export class HotComponent implements OnInit {
  source = interval(1000).pipe(
    map(s => s + 1),
    share()
  );

// source observable
  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {
      // 1st subscriber after 2 seconds
      console.log('subscriber1' + ' joined after: ' + 2 + ' seconds');
      this.source.subscribe(s => console.log('subscriber1 received: ', s));

      // 2nd Subscriber after 5 Seconds
      setTimeout(() => {
        console.log('subscriber2' + ' joined after: ' + 5 + ' seconds');
        this.source.subscribe(s => console.log('subscriber2 received: ', s));
      }, 5000);
    }, 2000);
  }
}

