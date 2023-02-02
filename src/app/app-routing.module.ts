import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {EntriesComponent} from './entries/entries.component';

const routes: Routes = [
  {path: '', redirectTo: 'questionnaires', pathMatch: 'full'},
  {path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'change-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'questionnaires',
    loadChildren: () => import('./questionnaires/questionnaires.module').then(m => m.QuestionnairesModule)
  },
  {
    path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'entries',
    component: EntriesComponent,
    loadChildren: () => import('./entries/entries.module').then(m => m.EntriesModule)
  },
  {
    path: 'me', loadChildren: () => import('./user/self-edit/self-edit.module').then(m => m.SelfEditModule)
  },
  {path: '**', redirectTo: '/questionnaires'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
