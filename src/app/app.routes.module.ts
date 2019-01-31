import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const APP_ROUTES: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "**", pathMatch: "full", redirectTo: "/dashboard" }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
