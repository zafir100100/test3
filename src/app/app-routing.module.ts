import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateTwoComponent } from './components/user-create-two/user-create-two.component';
import { UserCreateComponent } from './components/user-create/user-create/user-create.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'uc2',
    pathMatch: 'full'
  },
  {
    path: 'uc',
    component: UserCreateComponent
  },
  {
    path: 'uc2',
    component: UserCreateTwoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
