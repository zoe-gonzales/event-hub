import { useState } from "react";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import DatePicker from "react-datepicker";
import { createEvent } from "../models/event.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const start = formData.get("start") as string;
  const end = formData.get("end") as string;
  const location = formData.get("location") as string;

  const params = {
    title,
    description,
    start: new Date(start),
    end: new Date(end),
    location,
    userId: 1,
  };
  console.log("PARAMS: ", params);
  await createEvent(params);

  return redirect("/");
};

export default function EventRoute() {
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);

  return (
    <main className=" my-10 mx-auto w-3/4">
      <h1 className="text-xl font-semibold">Create a new event</h1>
      <Form method="post">
        <div className="my-8">
          <label>
            Title{" "}
            <input
              type="text"
              name="title"
              className="border-solid border-2 border-gray-950 rounded block w-1/3 mt-2 p-2"
            />
          </label>
        </div>

        <div className="my-8">
          <label>
            Description{" "}
            <textarea
              name="description"
              className="border-solid border-2 border-gray-950 rounded block w-1/3 mt-2 p-2"
            />
          </label>
        </div>

        <div className="my-8">
          <label>
            Location{" "}
            <input
              type="text"
              name="location"
              className="border-solid border-2 border-gray-950 rounded block w-1/3 mt-2 p-2"
            />
          </label>
        </div>

        <div className="my-8">
          <label>
            Start time{" "}
            <DatePicker
              showTimeSelect
              name="start"
              selected={startDateTime}
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(date) => setStartDateTime(date)}
              className="border-solid border-2 border-gray-950 rounded mt-2 p-2"
            />
          </label>
        </div>

        <div className="my-8">
          <label>
            End time{" "}
            <DatePicker
              showTimeSelect
              name="end"
              selected={endDateTime}
              dateFormat="MMMM d, yyyy h:mm aa"
              onChange={(date) => setEndDateTime(date)}
              className="border-solid border-2 border-gray-950 rounded mt-2 p-2"
            />
          </label>
        </div>
        <button type="submit" className="text-white rounded-lg bg-blue-600 p-3">
          Submit
        </button>
      </Form>
    </main>
  );
}
