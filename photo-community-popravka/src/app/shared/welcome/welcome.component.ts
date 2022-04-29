import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    trigger('listAnim', [
      transition(':enter', [
        query('.liAnim', [
          style({ opacity: 0, transform: 'translateX(-40px)' }),
          stagger('600ms', [
            animate('950ms 1.4s ease-out',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ]
      )
    ]),
    trigger('h4Anim', [
      transition(':enter', [
        query('.hAnim', [
          style({ opacity: 0, transform: 'translateY(-50px)'  }),
            animate('500ms 1s ease-out',
              style({ opacity: 1,  transform: 'translateY(0)' }))
        ], { optional: true })
      ]
      )
    ])
    
  ]
})
export class WelcomeComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$

  private subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.subscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
