import { Component } from '@angular/core';
import {ActivatedRoute, NavigationStart, Router, RouterOutlet} from '@angular/router';
import { ToastHandlerComponent } from './toast-handler/toast-handler.component';
import { CommonStore } from './stores/user/common-store.service';
import { LocalStorageService } from './providers/local-storage/local-storage.service';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastHandlerComponent, HeaderComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly router: Router;
  private readonly commonStore: CommonStore;
  private readonly localStorageService: LocalStorageService;
  showHeader: boolean;

  constructor(
    private activatedRoute : ActivatedRoute,
    router: Router,
    commonStore: CommonStore,
    localStorageService: LocalStorageService
  ) {
    this.showHeader = router.url !== '/login';
    this.router = router;
    this.commonStore = commonStore;
    this.localStorageService = localStorageService;
  }

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart) {
        this.showHeader = event.url !== '/login';
      }
    });

    this.startup();
  }

  async startup(): Promise<void> {
    const existingToken = this.localStorageService.getToken();
    const existingUser = this.localStorageService.getUser();

    if (existingToken) {
      this.commonStore.setToken(existingToken);
    }

    if (existingUser) {
      this.commonStore.setUser(existingUser);
    }

    const alreadyAuthenticated = !!existingToken && !!existingUser;

    if (!alreadyAuthenticated && this.router.url !== '/login') {
      await this.router.navigateByUrl('/login');
      return;
    } else if (alreadyAuthenticated && this.router.url !== '/home') {
      await this.router.navigateByUrl('/home');
      return;
    }
  }
}
