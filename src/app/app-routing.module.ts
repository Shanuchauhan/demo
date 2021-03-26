import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CompareComponent } from './compare/compare.component';

const routes: Routes = [
  {path: 'Search',component: SearchComponent},
  {path: 'Compare',component: CompareComponent},
  {path: '',redirectTo:'Search',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
