import { Component, NgModule, Injectable } from "@angular/core";
import { Routes, RouterModule, Router, NavigationStart } from "@angular/router";
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "my-app",
  template: `
    <a routerLink="A">A</a>
    <a routerLink="B">B</a>
    <a routerLink="C">C</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private router: Router) {
    router.events
      .pipe(
        // The "events" stream contains all the navigation events. For this demo,
        // though, we only care about the NavigationStart event as it contains
        // information about what initiated the navigation sequence.
        filter((event: NavigationEvent) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        console.group("NavigationStart Event");
        // Every navigation sequence is given a unique ID. Even "popstate"
        // navigations are really just "roll forward" navigations that get
        // a new, unique ID.
        console.log("navigation id:", event.id);
        console.log("route:", event.url);
        // The "navigationTrigger" will be one of:
        // --
        // - imperative (ie, user clicked a link).
        // - popstate (ie, browser controlled change such as Back button).
        // - hashchange
        // --
        // NOTE: I am not sure what triggers the "hashchange" type.
        console.log("trigger:", event.navigationTrigger);

        // This "restoredState" property is defined when the navigation
        // event is triggered by a "popstate" event (ex, back / forward
        // buttons). It will contain the ID of the earlier navigation event
        // to which the browser is returning.
        // --
        // CAUTION: This ID may not be part of the current page rendering.
        // This value is pulled out of the browser; and, may exist across
        // page refreshes.
        if (event.restoredState) {
          console.warn(
            "restoring navigation id:",
            event.restoredState.navigationId
          );
        }

        console.groupEnd();
      });
  }
}

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
    console.log(">>>>>>>>>>>>>>>>> canDeactivate called");
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
