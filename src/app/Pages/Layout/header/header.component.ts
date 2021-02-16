import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  public now: Date = new Date();
  public current_date_time_interval_holder: any

  constructor() { 
    this.current_date_time_interval_holder = setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit() {
  }

}
