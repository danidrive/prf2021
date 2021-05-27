import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper-input',
  templateUrl: './stepper-input.component.html',
  styleUrls: ['./stepper-input.component.css']
})
export class StepperInputComponent {
  title = "Stepper input";
  @Input() initialValue: number = 1;
  @Input() step: number = 1;
  @Input() min: number = 1;
  @Input() max: number = 100;
  renderedValue: string | undefined;
  value: number = 1;

  ngOnInit() {
    this.value = this.initialValue
    this.renderedValue = this.value.toString();
  }

  toggleMore = () => {
    if (this.step + this.value <= this.max) {
      this.value = this.value + this.step;
      this.renderedValue = this.value.toString();
    }
  };

  toggleLess = () => {
    if (this.value - this.step >= this.min) {
      this.value = this.value - this.step;
      this.renderedValue = this.value.toString();
    }
  };
}
