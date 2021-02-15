import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './shared/services/gaurd.service';
import { UserService } from './shared/services/user.service';

const routes: Routes = [
  { path : '', redirectTo : '/public', pathMatch : 'full'},
  { path : 'public', loadChildren: './public/public.module#PublicModule'},
  { path : 'member', loadChildren: './member/member.module#MemberModule', 
    canActivate: [AuthGuard], resolve:{usersvc : UserService}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
