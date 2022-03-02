import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AlumnoEdicionComponent } from './pages/alumno/alumno-edicion/alumno-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';
import { ApoderadoDialogoComponent } from './pages/apoderado/apoderado-dialogo/apoderado-dialogo.component';
import { AlumnoDialogoComponent } from './pages/alumno/alumno-dialogo/alumno-dialogo.component';
import { ApoderadoAutocompleteComponent } from './pages/apoderado/apoderado-autocomplete/apoderado-autocomplete.component';
import { NavComponent } from './nav/nav.component';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    AlumnoEdicionComponent,
    ApoderadoComponent,
    ApoderadoDialogoComponent,
    AlumnoDialogoComponent,
    ApoderadoAutocompleteComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgMaterialMultilevelMenuModule   
  ],
  providers: [MultilevelMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
