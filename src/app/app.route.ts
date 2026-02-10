import { Routes } from '@angular/router';

// dashboard
import { DashboardComponent } from './Dashboard';
import { AnalyticsComponent } from './analytics';
import { FinanceComponent } from './finance';
import { CryptoComponent } from './crypto';
import { AddStudentComponent } from './users/addstudent/addstudent.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AddMediaComponent } from './add-media.component';
import { CloseslotsComponent } from './closeslots';
import { AddServicesComponent } from './add-services';
import { ServicesDashboardComponent } from './services-dashboard';
import { ReshedulAppointmentComponent } from './reshedul-appointment';
import { ClassScheduleComponent } from './class-schedule.component';
import { CreateBatchComponent } from './users/create-batch/create-batch.component';
import { AssignBatchComponent } from './users/assign-batch/assign-batch.component';
import { AssignMediaComponent } from './users/assign-media/assign-media.component';
import { StudentStudyMaterialsComponent } from './student-study-materials/student-study-materials.component';
import { AssignTopicComponent } from './assign-topic/assign-topic.component';
import { UpgradeStudentBatchComponent } from './student/upgrade-student-batch/upgrade-student-batch.component';
import { AddTopicComponent } from './pages/add-topic/add-topic.component';
import { PaymentReceiptComponent } from './payment-receipt/payment-receipt.component';
import { UploadCertificateComponent } from './upload-certificate/upload-certificate.component';
import { StudentCertificatesComponent } from './student-certificates/student-certificates.component';
import { StudentReceiptsComponent } from './student-receipts/student-receipts.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';


// widgets
import { WidgetsComponent } from './widgets';

// tables
import { TablesComponent } from './tables';

// font-icons
import { FontIconsComponent } from './font-icons';

// charts
import { ChartsComponent } from './charts';

// dragndrop
import { DragndropComponent } from './dragndrop';

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';
import { ShedulesComponent } from './shedules/shedules.component';
import { title } from 'process';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayout,
        children: [
            { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
        ],
    },

    {
        path: '',
        component: AppLayout,
        children: [
            // dashboard
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Sales Admin' } },
            { path: 'analytics', component: AnalyticsComponent, data: { title: 'Analytics Admin' } },
            { path: 'finance', component: FinanceComponent, data: { title: 'Finance Admin' } },
            { path: 'crypto', component: CryptoComponent, data: { title: 'Crypto Admin' } },
            { path: 'add-student', component: AddStudentComponent, data: { title: 'Add Student' } },
            {path: 'student-dashboard', component: StudentDashboardComponent, data: { title: 'Student Dashboard' }},
            {path: 'student-details', component: StudentDetailsComponent, data: { title: 'Student Details' }},
            {path: 'shedules', component: ShedulesComponent, data: {title: 'shedules'}},
            {path: 'add-appointment', component: AddAppointmentComponent, data: { title: 'Add Appointment' }},
            {path: 'add-media', component: AddMediaComponent, data: { title: 'Add Media' }},
            {path: 'close-slots', component: CloseslotsComponent, data: { title: 'Close Slots' }},
            {path: 'add-services', component: AddServicesComponent, data: { title: 'Add Services' }},
            {path: 'services-dashboard', component: ServicesDashboardComponent, data: { title: 'Services Dashboard' }},
            {path: 'reshedul-appointment', component: ReshedulAppointmentComponent, data: { title: 'Reschedule Appointment' }},
            {path: 'class-schedule', component:  ClassScheduleComponent, data: {title: 'class-schedule'}},
            {path: 'create-batch', component: CreateBatchComponent, data: {title: 'Create Batch'}},
            {path: 'assign-batch', component: AssignBatchComponent, data: {title: 'Assign Batch'}},
            {path: 'assign-media', component: AssignMediaComponent, data: {title: 'Assign Media'}},
            { path: 'student-study-materials', component: StudentStudyMaterialsComponent, data: { title: 'Student Study Materials' } },
            { path: 'assign-topic', component: AssignTopicComponent, data: { title: 'Assign Topic' } },
            { path: 'upgrade-student-batch', component: UpgradeStudentBatchComponent, data: { title: 'Upgrade Student Batch' } },
            { path: 'add-topic', component: AddTopicComponent, data: { title: 'Add Topic' } },
            { path: 'payment-receipt', component: PaymentReceiptComponent, data: { title: 'Payment Receipt' } },
            { path: 'upload-certificate', component: UploadCertificateComponent, data: { title: 'Upload Certificate' } },
            { path: 'student-certificates', component: StudentCertificatesComponent, data: { title: 'Student Certificates' } },
            { path: 'student-receipts', component: StudentReceiptsComponent, data: { title: 'Student Receipts' } },
            { path: 'attendance', component: AttendanceComponent, data: { title: 'Attendance' } },


                       
            

            // widgets
            { path: 'widgets', component: WidgetsComponent, data: { title: 'Widgets' } },

            // font-icons
            { path: 'font-icons', component: FontIconsComponent, data: { title: 'Font Icons' } },

            // charts
            { path: 'charts', component: ChartsComponent, data: { title: 'Charts' } },

            // dragndrop
            { path: 'dragndrop', component: DragndropComponent, data: { title: 'Dragndrop' } },

            // pages
            { path: 'pages/knowledge-base', component: KnowledgeBaseComponent, data: { title: 'Knowledge Base' } },
            { path: 'pages/faq', component: FaqComponent, data: { title: 'FAQ' } },

            //apps
            { path: '', loadChildren: () => import('./apps/apps.module').then((d) => d.AppsModule) },

            // components
            { path: '', loadChildren: () => import('./components/components.module').then((d) => d.ComponentsModule) },

            // elements
            { path: '', loadChildren: () => import('./elements/elements.module').then((d) => d.ElementsModule) },

            // forms
            { path: '', loadChildren: () => import('./forms/form.module').then((d) => d.FormModule) },

            // users
            { path: '', loadChildren: () => import('./users/user.module').then((d) => d.UsersModule) },

            // tables
            { path: 'tables', component: TablesComponent, data: { title: 'Tables' } },
            { path: '', loadChildren: () => import('./datatables/datatables.module').then((d) => d.DatatablesModule) },
        ],
    },

    {
        path: '',
        component: AuthLayout,
        children: [
            // pages
            { path: '', loadChildren: () => import('./pages/pages.module').then((d) => d.PagesModule) },

            // auth
            { path: '', loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule) },
        ],
    },
];
