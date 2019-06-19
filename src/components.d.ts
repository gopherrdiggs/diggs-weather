/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface AppHome {}
  interface AppRoot {}
  interface AppSettings {}
  interface HourlyForecastItem {
    'iconName': string;
    'temperature': string;
    'time': string;
  }
}

declare global {


  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLAppSettingsElement extends Components.AppSettings, HTMLStencilElement {}
  var HTMLAppSettingsElement: {
    prototype: HTMLAppSettingsElement;
    new (): HTMLAppSettingsElement;
  };

  interface HTMLHourlyForecastItemElement extends Components.HourlyForecastItem, HTMLStencilElement {}
  var HTMLHourlyForecastItemElement: {
    prototype: HTMLHourlyForecastItemElement;
    new (): HTMLHourlyForecastItemElement;
  };
  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-root': HTMLAppRootElement;
    'app-settings': HTMLAppSettingsElement;
    'hourly-forecast-item': HTMLHourlyForecastItemElement;
  }
}

declare namespace LocalJSX {
  interface AppHome extends JSXBase.HTMLAttributes<HTMLAppHomeElement> {}
  interface AppRoot extends JSXBase.HTMLAttributes<HTMLAppRootElement> {}
  interface AppSettings extends JSXBase.HTMLAttributes<HTMLAppSettingsElement> {}
  interface HourlyForecastItem extends JSXBase.HTMLAttributes<HTMLHourlyForecastItemElement> {
    'iconName'?: string;
    'temperature'?: string;
    'time'?: string;
  }

  interface IntrinsicElements {
    'app-home': AppHome;
    'app-root': AppRoot;
    'app-settings': AppSettings;
    'hourly-forecast-item': HourlyForecastItem;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}

