import { render, screen } from "@testing-library/react";
import EventsPreview from "@/app/components/EventsPreview";
import { AllEvents } from "@/types/event";

jest.mock("@/app/components/EventCardClassy", () => ({
  __esModule: true,
  default: ({ event }: { event: { title: string } }) => (
    <div data-testid="event-card">{event.title}</div>
  ),
}));

const createEvent = (overrides: Partial<AllEvents> = {}): AllEvents => ({
  id: "evt-001",
  name: "Test Event",
  slug: "test-event",
  desc: "A sample event description",
  location: "Online",
  start: "10:00",
  end: "12:00",
  date: "15-12-2099",
  thumbnailurl: "https://example.com/thumb.jpg",
  commudleUrl: "https://example.com/rsvp",
  ...overrides,
});

describe("EventsPreview", () => {
  it("renders event cards for upcoming events", () => {
    render(<EventsPreview upcomingEvents={[createEvent()]} />);

    expect(screen.getByText(/Upcoming Events/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("event-card")).toHaveLength(1);
  });

  it("shows empty state when no future events exist", () => {
    const pastEvent = createEvent({ date: "01-01-2000" });
    render(<EventsPreview upcomingEvents={[pastEvent]} />);

    expect(
      screen.getByText(/No upcoming events found/i)
    ).toBeInTheDocument();
  });
});

