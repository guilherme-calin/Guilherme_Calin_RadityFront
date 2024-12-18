import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../providers/authentication/authentication.service';
import { ToastService } from '../../providers/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  standalone: true,
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private readonly authenticationService: AuthenticationService;
  private readonly toastService: ToastService;
  private readonly router: Router;

  loading: boolean;
  username: string;
  password: string;

  constructor(
    authenticationService: AuthenticationService,
    toastService: ToastService,
    router: Router
  ) {
    this.username = '';
    this.password = '';
    this.loading = false;

    this.authenticationService = authenticationService;
    this.toastService = toastService;
    this.router = router;
  }

  async onLogin(): Promise<void> {
    try {
      this.loading = true;
      const response = await this.authenticationService.authenticate(this.username, this.password);

      this.authenticationService.updateStore(response);

      await this.router.navigateByUrl('/home');
    } catch (e) {
      this.toastService.showError('Login', 'Authentication failed');

      this.loading = false;
    }
  }
}
