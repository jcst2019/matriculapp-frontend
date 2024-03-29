// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  HOST:'http://localhost:8080',
  HOST_SIN_HTTP:'localhost:8080',
  RUTA_OAUTH:'http://localhost:8080/oauth/token',
  TOKEN_AUTH_USERNAME: 'matriculapp',
  TOKEN_AUTH_PASSWORD: 'clave1985',
  TOKEN_NAME: 'access_token',
  REINTENTOS: 2,
  ID_USUARIO: 'id_user',
  NAME_USUARIO: 'name_user',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
