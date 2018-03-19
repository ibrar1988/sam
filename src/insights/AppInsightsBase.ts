import { Component, ReflectiveInjector } from '@angular/core';
import {MonitoringService} from './AppInsightsModule';

@Component({
  template: ''
})
export class BaseComponent {

  private monitoringService: MonitoringService;
  constructor() {
    // Manually retrieve the monitoring service from the injector
    // so that constructor has no dependencies that must be passed in from child
    const injector = ReflectiveInjector.resolveAndCreate([
      MonitoringService
    ]);
    this.monitoringService = injector.get(MonitoringService);
    this.logNavigation();
  }

  private logNavigation() {
    this.monitoringService.logPageView();
  }
}
