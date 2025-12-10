import { Component } from '@angular/core';
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
export class CoverLoginComponent {

  email: string = '';
  password: string = '';

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

  async initStore() {
    this.storeData.select((d) => d.index).subscribe((d) => {
      this.store = d;
    });
  }

  login() {
    const body = {
      email: this.email,
      password: this.password,
    };

    this.api.login(body).subscribe({
      next: (res: any) => {
        console.log("Login success:", res);

        if (res.token) {
          localStorage.setItem("token", res.token);
        }

         this.router.navigate(['/Dashboard']);
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
