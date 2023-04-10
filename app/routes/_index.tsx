import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, type V2_MetaFunction } from "@remix-run/react";
import { getEvents } from "../models/event.server";

type Event = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  location: string;
};

type LoaderData = {
  events: Awaited<Event[]>;
};

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader: LoaderFunction = async () => {
  const events = await getEvents();
  return json({ events });
};

export default function Index() {
  const { events } = useLoaderData() as LoaderData;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`events/${event.id}`}>{event.title}</Link>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{event.start}</p>
            <p>{event.end}</p>
          </li>
        ))}
      </ul>
      <Link to={`events/new`}>New event</Link>
    </div>
  );
}
