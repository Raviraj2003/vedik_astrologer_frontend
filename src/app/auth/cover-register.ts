import { Component } from '@angular/core';
import { toggleAnimation } from 'src/app/shared/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
    templateUrl: './cover-register.html',
    animations: [toggleAnimation],
})
export class CoverRegisterComponent {

 formData = {
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    password: '',
    role: 'ADM'
};


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
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
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

    // Submit Form
    onSubmit() {
        this.api.register(this.formData).subscribe({
            next: (res) => {
                console.log("Register Success", res);
                this.router.navigate(['/auth/cover-login']);
            },
            error: (err) => {
                console.error("Register Error", err);
            }
        });
    }
}
