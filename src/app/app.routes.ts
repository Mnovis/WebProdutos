import { Routes } from '@angular/router';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { CadastroProdutos } from './components/pages/cadastro-produtos/cadastro-produtos';
import { ConsultaProdutos } from './components/pages/consulta-produtos/consulta-produtos';
import { EdicaoProdutos } from './components/pages/edicao-produtos/edicao-produtos';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: 'cadastro-produtos',
    component: CadastroProdutos
  },
  {
    path: 'consulta-produtos',
    component: ConsultaProdutos
  },
  {
    path: 'edicao-produtos/:id',
    component: EdicaoProdutos
  }
];
