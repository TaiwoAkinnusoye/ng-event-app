import { Routes } from "@angular/router";
// Barrel Imports
import {
  EventsListResolver,
  EventsListComponent,
  CreateEventComponent,
  EventDetailComponent,
  CreateSessionComponent
} from "./events/event-barrel";
import { Error404Component } from "./errors/404.component";
import { EventResolver } from "./events/event-resolver.service";

export const appRoutes: Routes = [
  {
    path: "events/new",
    component: CreateEventComponent,
    canDeactivate: ["canDeactivateCreateEvent"]
  },
  {
    path: "events",
    component: EventsListComponent,
    resolve: { events: EventsListResolver }
  },
  {
    path: "events/:id",
    component: EventDetailComponent,
    resolve: {event: EventResolver}
  },
  { path: "events/session/new", component: CreateSessionComponent },
  { path: "404", component: Error404Component },
  { path: "", redirectTo: "/events", pathMatch: "full" },
  { path: "user", loadChildren: "./user/user.module#UserModule" }
];
