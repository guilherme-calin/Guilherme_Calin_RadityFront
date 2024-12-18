import { Component } from '@angular/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {CommonStore} from '../../stores/user/common-store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    NgbPopover
  ],
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly commonStore: CommonStore;
  private readonly router: Router;

  constructor(
    commonStore: CommonStore,
    router: Router,
  ) {
    this.commonStore = commonStore;
    this.router = router;
  }

  async logout(): Promise<void> {
    this.commonStore.purgeAll();

    this.router.navigate(['login']);
  }
}
