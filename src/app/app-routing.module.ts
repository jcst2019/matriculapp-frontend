import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { AlumnoEdicionComponent } from './pages/alumno/alumno-edicion/alumno-edicion.component';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';

const routes: Routes = [
  { path: 'alumno', component: AlumnoComponent, children:[
    {path: 'nuevo', component: AlumnoEdicionComponent},
    {path: 'edicion/:id', component: AlumnoEdicionComponent}
  ] },
  
  { path: 'apoderado', component:ApoderadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

