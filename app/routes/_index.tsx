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

const cardClassName =
  "bg-theme-beige rounded w-2/3 mx-auto my-10 p-8 rounded-xl";

export default function Index() {
  const { events } = useLoaderData() as LoaderData;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <nav className="flex justify-end bg-theme-dark-blue h-16">
        <Link
          className="bg-theme-beige p-3 m-2 rounded-lg text-theme-black hover:bg-white"
          to={`events/new`}
        >
          New event
        </Link>
      </nav>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <section className={cardClassName}>
              <Link
                className="text-2xl font-semibold hover:underline"
                to={`events/${event.id}`}
              >
                {event.title}
              </Link>
              <p className="my-3 font-mono">{event.description}</p>
              <p className="my-3 font-light">{event.location}</p>
              <p className="my-3">{`${event.start} - ${event.end}`}</p>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}
