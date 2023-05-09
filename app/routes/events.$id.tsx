import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getEvent } from "~/models/event.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  if (id) {
    const eventDetails = await getEvent(id);
    return json({ eventDetails });
  }

  return json({ eventDetails: null });
};

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

      <Outlet />
    </div>
  );
}
