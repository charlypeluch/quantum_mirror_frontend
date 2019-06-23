import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract, AuthenticationMirrorGuard } from '@app/core';
import { QuantumComponent } from './quantum.component';
import { QuantumAccessComponent } from './quantum-access/quantum-access.component';
import { QuantumDashboardComponent } from './quantum-dashboard/quantum-dashboard.component';

const routes: Routes = [
  { path: 'quantum', component: QuantumComponent, canActivate: [AuthenticationMirrorGuard], data: { title: extract('Quantum') },
    children: [
      { path: '', redirectTo: 'quantum-dashboard', pathMatch: 'full'},
      { path: 'quantum-access', component: QuantumAccessComponent, data: { title: extract('Quantum Access') }},
      { path: 'quantum-dashboard', component: QuantumDashboardComponent, data: { title: extract('Quantum Dashboard') }}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class QuantumRoutingModule { }
