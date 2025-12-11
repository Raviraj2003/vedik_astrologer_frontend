import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  store: any;
  isDark = false;
  isLoading = true;

  constructor(public storeData: Store<any>) {
    this.initStore();
    this.isLoading = false;
  }

  // subscribe to theme/layout state changes
  async initStore() {
    this.storeData.select((d) => d.index).subscribe((d) => {
      const hasChangeTheme = this.store?.theme !== d?.theme;
      const hasChangeLayout = this.store?.layout !== d?.layout;

      this.store = d;
      this.isDark = this.store.theme === 'dark' || this.store.isDarkMode;

      if (hasChangeTheme || hasChangeLayout) {
        this.applyTheme();
      }
    });
  }

  // apply dynamic theme classes
  applyTheme() {
    if (this.isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
