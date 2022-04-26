import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from '../interfaces';
import { MessageBusService, MessageType } from '../message-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  message: string;
  isMessageError: boolean;

  private isLoggingOut: boolean = false;

  private subscription: Subscription;

  constructor(public authService: AuthService, private router: Router, private messageBus: MessageBusService) {
  }

  ngOnInit(): void {
    this.subscription = this.messageBus.onNewMessage$.subscribe(newMessage => {
      //notificirai me kogato ima novo syobshtenie
      this.message = newMessage?.text || '';
      this.isMessageError = newMessage?.type === MessageType.Error;

      if (this.message) {
        setTimeout(() => {
          this.messageBus.clear();
        }, 3000);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logoutHandler(): void {
    if (this.isLoggingOut) {
      return;
    }
    this.isLoggingOut = true;
    this.authService.logout$().subscribe({
      next: args => {
        //tuk poluchavam responsa i kogato e gotova cqlata zaqvka vliza v complete
      },
      complete: () => {
        this.isLoggingOut = false;
        //taka steita si ostava
        this.router.navigate(['/home']);
      },
      error: () => {
        this.isLoggingOut = false;
        //dori i pri error da zavyrshim logauta
      }
    });
  }
}
