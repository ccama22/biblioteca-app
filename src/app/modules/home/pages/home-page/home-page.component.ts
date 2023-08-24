import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav
  
  constructor(private observer: BreakpointObserver, private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((resp: any) => {
        if (resp.matches) {
          setTimeout(() => {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          });
        } else {
          setTimeout(() => {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          });
        }
    });
    this.cd.detectChanges()
  }

}
