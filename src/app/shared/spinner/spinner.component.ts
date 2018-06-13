import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  subscription: Subscription;

  /**
   * @description Defines threhold for not to diplay if time is less than 500ms
   * @type {number}
   * @memberof LoadingComponent
   */
  threshold: number = 200;

  /**
   * @description Show/hide spinner
   * @memberof LoadingComponent
   */
  showSpinner = false;

  constructor(private spinnerService: SpinnerService) {
    this.createServiceSubscription();
  }

  ngOnInit() {
  }

  createServiceSubscription() {
    let timer: any;

    this.subscription =
      this.spinnerService.getMessage().subscribe(show => {
        if (show) {
          if (timer){
            return;
          }
          timer = setTimeout(function () {
            timer = null;

            this.showSpinner = show;
          }.bind(this), this.threshold);
        } else {
          clearTimeout(timer);
          this.showSpinner = false;
        }
      });
  }
}
