import { Component, OnInit } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
// tslint:disable-next-line:max-line-length
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { Keepalive } from '@ng-idle/keepalive';
import { Router, ActivatedRoute } from '@angular/router';
import { RefresTokenService } from '../../../core/services/Account/refrestoken.service';
import { LogoutService } from 'core/services/Account/logout.service';


@Component({
  moduleId: module.id,
  selector: 'idle-component',
  templateUrl: 'idle.component.html',
  providers: [Idle, Keepalive, RefresTokenService,LogoutService]
})

export class IdleComponent {
  public idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(private idle: Idle, private keepalive: Keepalive, private router: Router, private refreshTokenService: RefresTokenService,
    private logoutService: LogoutService) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(1);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    // idle.setTimeout(86400);

    idle.setTimeout(86400);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    //  idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      // refreshTokenService.refresToken();
      this.logoutService.logout();

    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    keepalive.interval(10);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}