import { Component, NgModule, Injectable } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

@Component({
  selector: "my-app",
  template: `
    <a routerLink="A">A</a>
    <a routerLink="B">B</a>
    <a routerLink="C">C</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

@Component({
  selector: "app-a",
  template: "<h1>A</h1>"
})
export class AComponent {}

@Component({
  selector: "app-b",
  template: "<h1>B</h1>"
})
export class BComponent {}

@Component({
  selector: "app-c",
  template: "<h1>C</h1>"
})
export class CComponent {}

/***** gaurd */

@Injectable()
export class serviceName {
  canDeactivate(component) {
    console.log('>>>>>>>>>>>>>>>>> canDeactivate called')
    return false;
  }
}

/** router */

const routes: Routes = [
  { path: "A", component: AComponent },
  { path: "B", component: BComponent, canDeactivate: [serviceName] },
  { path: "C", component: CComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule {}
