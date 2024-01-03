import { Routes } from '@angular/router';
import {LogPageComponent} from "./log-page/log-page.component";
import {MainPageComponent} from "./main-page/main-page.component";

export const routes: Routes = [
  {path : "auth", component : LogPageComponent},
  {path : "point", component : MainPageComponent},
  {path : "**", redirectTo : "auth"}
];
