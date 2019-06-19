import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: 'hourly-forecast-item',
  styleUrl: 'hourly-forecast-item.css'
})
export class HourlyForecastItem {

  @Prop() time: string = '4:00 PM';
  @Prop() iconName: string = 'cloudy';
  @Prop() temperature: string = '83';

  render() {
    return [
      <div class='hourly-forecast-container'>
        <div>{this.time}</div>
        <div><ion-icon name={this.iconName} /></div>
        <div>{this.temperature}&#176;</div>
      </div>
    ];
  }
}