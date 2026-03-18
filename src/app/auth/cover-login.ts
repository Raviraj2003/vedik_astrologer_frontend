import { Component, OnInit } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  templateUrl: './cover-login.html',
  animations: [toggleAnimation],
})
export class CoverLoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  store: any;
  currYear: number = new Date().getFullYear();

  constructor(
    public translate: TranslateService,
    public storeData: Store<any>,
    public router: Router,
    private appSetting: AppService,
    private api: ApiService
  ) {
    this.initStore();
  }

  ngOnInit() {
    // Load saved credentials if "Remember Me" was checked
    this.loadSavedCredentials();
  }

  async initStore() {
    this.storeData.select((d) => d.index).subscribe((d) => {
      this.store = d;
    });
  }

  loadSavedCredentials() {
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    const rememberMe = localStorage.getItem('rememberMe');

    if (rememberMe === 'true' && savedEmail && savedPassword) {
      this.email = savedEmail;
      this.password = savedPassword;
      this.rememberMe = true;
    }
  }

  saveCredentials() {
    if (this.rememberMe) {
      // Save credentials if "Remember Me" is checked
      localStorage.setItem('savedEmail', this.email);
      localStorage.setItem('savedPassword', this.password);
      localStorage.setItem('rememberMe', 'true');
    } else {
      // Clear saved credentials if "Remember Me" is unchecked
      localStorage.removeItem('savedEmail');
      localStorage.removeItem('savedPassword');
      localStorage.removeItem('rememberMe');
    }
  }

  login() {
    const body = {
      email: this.email,
      password: this.password,
    };

    this.api.login(body).subscribe({
      next: (res: any) => {
        console.log("Login success:", res);

        if (res.success && res.data) {
          const { token, role } = res.data;

          // Save credentials if "Remember Me" is checked
          this.saveCredentials();

          // ✅ Save token & user data
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(res.data));

          // ✅ Normalize role to uppercase for safety
          const userRole = role?.toUpperCase();

          // ✅ Redirect based on role
          if (userRole === 'ADM') {
            this.router.navigate(['/dashboard']);
          } else if (userRole === 'STD') {
            this.router.navigate(['/student-dashboard']);
          } else {
            alert('Unknown role. Please contact support.');
            this.router.navigate(['/login']);
          }
        } else {
          alert(res.message || "Login failed. Please try again.");
        }
      },
      error: (err) => {
        console.error("Login failed:", err);
        alert("Invalid email or password");
      }
    });
  }

  changeLanguage(item: any) {
    this.translate.use(item.code);
    this.appSetting.toggleLanguage(item);
    if (this.store.locale?.toLowerCase() === 'ae') {
      this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
    } else {
      this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
    }
    window.location.reload();
  }
}