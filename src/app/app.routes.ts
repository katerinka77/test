import { Routes, provideRouter, withDebugTracing } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductComponent } from './pages/catalog/products.component';
import { ApplicationConfig } from '@angular/core';

export const routes: Routes = [
  {
    title: 'Home',
    path: '',
    component: HomeComponent,
  },
  {
    title: 'About',
    path: 'about',
    component: AboutComponent,
  },
  {
    title: 'Catalog',
    path: 'catalog',
    component: ProductComponent,
  },
];

// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes, withDebugTracing())]
// }
