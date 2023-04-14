import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getEvent } from "~/models/event.server";
import { formatDate } from "~/utils";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  if (id) {
    const eventDetails = await getEvent(id);
    return json({ eventDetails });
  }

  return json({ eventDetails: null });
};

const cardClassName =
  "bg-theme-beige rounded w-2/3 mx-auto my-10 p-8 rounded-xl";

export default function EventRoute() {
  const { eventDetails } = useLoaderData();

  if (!eventDetails) {
    return (
      <>
        <div>Oops! We can't find that event</div>
        <Link to="/">Back to events</Link>
      </>
    );
  }

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

      <section className={cardClassName}>
        <Link
          className="bg-theme-dark-blue p-3 my-2 rounded-lg text-theme-beige"
          to="/"
        >
          Back to events
        </Link>
        <h2 className="mt-6 mb-3 text-2xl font-semibold">
          {eventDetails.title}
        </h2>
        <p className="my-3 font-mono">{eventDetails.description}</p>
        <p className="my-3 font-light">{eventDetails.location}</p>
        <p className="my-3">
          {formatDate(eventDetails.start, eventDetails.end)}
        </p>
      </section>
    </div>
  );
}
