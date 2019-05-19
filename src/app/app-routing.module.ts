import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { AccessComponent } from '@app/access/access.component';
// import { LoginComponent } from '@app/access/login/login.component';
// import { RegisterComponent } from '@app/access/register/register.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' }
  ]),

  // { path: 'access', component: AccessComponent,
  //     children: [
  //       { path: '', redirectTo: 'login', pathMatch: 'full'},
  //       { path: 'login', component: LoginComponent},
  //       { path: 'register', component: RegisterComponent},
  //     ]
  // },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
