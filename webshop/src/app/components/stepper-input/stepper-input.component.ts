import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'stepper-input',
  templateUrl: './stepper-input.component.html',
  styleUrls: ['./stepper-input.component.css']
})
export class StepperInputComponent {
  @Input() step: number = 1;
  @Input() min: number = 1;
  @Input() max: number = 100;
  @Input() value: number = 1;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  renderedValue: string = '';

  ngOnInit() {
    this.valueChange.emit(this.value);
    this.renderedValue = this.value.toString();
  }

  toggleMore = () => {
    if (this.step + this.value <= this.max) {
      this.value = this.value + this.step;
      this.renderedValue = this.value.toString();
      this.valueChange.emit(this.value);
    }
  };

  toggleLess = () => {
    if (this.value - this.step >= this.min) {
      this.value = this.value - this.step;
      this.renderedValue = this.value.toString();
      this.valueChange.emit(this.value);
    }
  };
}
