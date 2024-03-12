import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../../dashboard/dashboard.module').then(
            m => m.DashboardModule
          ),
      },
    ],
  },
];
