import { APP_INITIALIZER, ApplicationConfig, isDevMode, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { provideRouter } from '@angular/router';
import { ErrorLogHandlerService } from './error-log-handler.service';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService, KeycloakBearerInterceptor } from 'keycloak-angular';
import { keyCloakConfig } from './environment';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: keyCloakConfig,
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),
    provideHttpClient(
        withInterceptorsFromDi()
    ),
    provideAnimations(),
    KeycloakAngularModule,
    KeycloakService,
    KeycloakBearerInterceptor,
    {
                provide: HTTP_INTERCEPTORS,
                useClass: KeycloakBearerInterceptor,
                multi: true,
                deps: [KeycloakService]
    },
    {
          provide: APP_INITIALIZER,
          useFactory: initializeKeycloak,
          multi: true,
          deps: [KeycloakService]
    },
    { provide: ErrorHandler, useClass: ErrorLogHandlerService }
  ]
};
