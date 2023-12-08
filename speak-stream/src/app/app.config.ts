import { ApplicationConfig, isDevMode, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ErrorLogHandlerService } from './error-log-handler.service';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAnimations(),
    { provide: ErrorHandler, useClass: ErrorLogHandlerService }
  ]
};
