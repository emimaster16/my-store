import { AdminGuard } from './guards/admin.guard';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomPreloadService } from './services/custom-preload.service';

import { TimeInterceptor } from './interceptors/time.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(module => module.WebsiteModule),
    data: {
      preload: true,
    }
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(module => module.CmsModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    QuicklinkModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: QuicklinkStrategy
      // CustomPreloadService
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
