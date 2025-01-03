import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { NgModule } from '@angular/core';
import { RegistroNutriologoComponent } from './partials/registro-nutriologo/registro-nutriologo.component';
import { RegistroPacienteComponent } from './partials/registro-paciente/registro-paciente.component';
import { NutriologoScreenComponent } from './screens/nutriologo-screen/nutriologo-screen.component';
import { DietaPorcionComponent } from './partials/dieta-porcion/dieta-porcion.component';
import { DietaTiempoComponent } from './partials/dieta-tiempo/dieta-tiempo.component';
import { ProteinasComponent } from './partials/Alimentos/proteinas/proteinas.component';
import { VerdurasComponent } from './partials/Alimentos/verduras/verduras.component';
import { FrutasComponent } from './partials/Alimentos/frutas/frutas.component';
import { CarbohidratosComponent } from './partials/Alimentos/carbohidratos/carbohidratos.component';



const routes: Routes = [
  {path: '', component: LoginScreenComponent, pathMatch: 'full'},
  {path: 'registro-usuarios', component: RegistroScreenComponent, pathMatch: 'full'},
  {path: 'registro-usuarios/:rol', component: RegistroScreenComponent, pathMatch: 'full'},
  { path: 'registro-usuarios/:rol/:id', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'login', component: LoginScreenComponent, pathMatch: 'full' },
  { path: 'registro-nutriologo', component: RegistroNutriologoComponent, pathMatch: 'full' },
  { path: 'registro-paciente', component: RegistroPacienteComponent, pathMatch: 'full' },
  { path: 'registro-screen', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'nutriologo-screen', component: NutriologoScreenComponent, pathMatch: 'full' },
  { path: 'proteinas', component: ProteinasComponent, pathMatch: 'full' },
  { path: 'verduras', component: VerdurasComponent, pathMatch: 'full' },
  { path: 'frutas', component: FrutasComponent, pathMatch: 'full' },
  { path: 'carbohidratos', component: CarbohidratosComponent, pathMatch: 'full' },
  { path: 'dieta-porcion', component: DietaPorcionComponent, pathMatch: 'full' },
  { path: 'dieta-tiempo', component: DietaTiempoComponent, pathMatch: 'full' },

  { path: 'patients', loadChildren: () => import('./patients/patients.module').then((m) => m.PatientsModule), pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
