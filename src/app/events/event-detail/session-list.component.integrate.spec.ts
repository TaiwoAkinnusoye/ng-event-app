import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { SessionListComponent } from "./session-list.component";
import { UpVoteComponent } from "./upvote.component";
import { DurationPipe } from "../shared/duration.pipe";
import { CollapsibleWellComponent } from "../../common/collapsible-well.component";
import { AuthService } from "../../user/auth.service";
import { VoterService } from "./voter.service";
import { ISession } from "../event-barrel";
import { By } from "@angular/platform-browser";

describe("SessionListComponent", () => {
  let fixture: ComponentFixture<SessionListComponent>;
  let component: SessionListComponent;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    let mockAuthService = {
      isAuthenticated: () => true,
      currentUser: { userName: "joe" }
    };
    let mockVoterService = {
      userHasVoted: () => true
    };

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SessionListComponent,
        UpVoteComponent,
        DurationPipe,
        CollapsibleWellComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        },
        {
          provide: VoterService,
          useValue: mockVoterService
        }
      ],
      schemas: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe("initial display", () => {
    it("should have the correct session title", () => {
      component.sessions = [
        {
          id: 3,
          name: "Session 1",
          presenter: "Joe",
          duration: 1,
          level: "beginner",
          abstract: "abstract",
          voters: ["joe", "john"]
        }
      ];
      component.filterBy = "all";
      component.sortBy = "name";
      component.eventId = 4;

      component.ngOnChanges();
      fixture.detectChanges();

      expect(element.querySelector("[well-title]").textContent).toContain(
        "Session 1"
      );
    });
  });
});
