import { useState } from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import DatePicker from "react-datepicker";
import { updateEvent, getEvent } from "../models/event.server";

export const action: ActionFunction = async ({ params, request }) => {
  if (!params.id) {
    return; // TODO: handle error
  }
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const start = formData.get("start") as string;
  const end = formData.get("end") as string;
  const location = formData.get("location") as string;

  const formParams = {
    title,
    description,
    start: new Date(start),
    end: new Date(end),
    location,
    userId: 1,
  };
  await updateEvent(params.id, formParams);

  return redirect(`/events/${params.id}`);
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  if (id) {
    const eventDetails = await getEvent(id);
    return json({ eventDetails });
  }

  return json({ eventDetails: null });
};

export default function EditEventRoute() {
  const { eventDetails } = useLoaderData();
  const [startDateTime, setStartDateTime] = useState<Date | null>(
    new Date(eventDetails.start)
  );
  const [endDateTime, setEndDateTime] = useState<Date | null>(
    new Date(eventDetails.end)
  );

  return (
    <main className="my-14 mx-auto w-3/4">
      <h1 className="text-xl font-semibold w-1/2 mx-auto">
        {`Editing ${eventDetails.title}`}
      </h1>
      <Form method="put" className="w-1/2 mx-auto">
        <div className="my-8">
          <label>
            Title{" "}
            <input
              type="text"
              name="title"
              defaultValue={eventDetails.title}
              className="border-solid border-2 border-theme-dark-blue rounded block w-full mt-2 p-2"
            />
          </label>
        </div>

        <div className="my-8">
          <label>
            Description{" "}
            <textarea
              name="description"
              defaultValue={eventDetails.description}
              className="border-solid border-2 border-theme-dark-blue rounded block w-full mt-2 p-2"
            />
          </label>
        </div>

        <div className="my-8">
          <label>
            Location{" "}
            <input
              type="text"
              name="location"
              defaultValue={eventDetails.location}
              className="border-solid border-2 border-theme-dark-blue rounded block w-full mt-2 p-2"
            />
          </label>
        </div>

        <div className="inline-flex">
          <div className="my-8 w-1/2">
            <label>
              Start time{" "}
              <DatePicker
                showTimeSelect
                name="start"
                selected={startDateTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                onChange={(date) => setStartDateTime(date)}
                className="border-solid border-2 border-theme-dark-blue rounded mt-2 p-2"
              />
            </label>
          </div>

          <div className="my-8 w-1/2">
            <label>
              End time{" "}
              <DatePicker
                showTimeSelect
                name="end"
                selected={endDateTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                onChange={(date) => setEndDateTime(date)}
                className="border-solid border-2 border-theme-dark-blue rounded mt-2 p-2"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="text-white rounded-lg bg-theme-med-blue p-3 block"
        >
          Submit
        </button>
      </Form>
    </main>
  );
}
