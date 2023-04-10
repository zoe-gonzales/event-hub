import { Form } from "@remix-run/react";
import DatePicker from "react-datepicker";

export default function EventRoute() {
  return (
    <main className=" my-10 mx-auto w-3/4">
      <h1 className="text-xl font-semibold">Create a new event</h1>
      <Form method="post">
        <p className="my-8">
          <label>
            Title{" "}
            <input
              type="text"
              name="title"
              className="border-solid border-2 border-gray-950 rounded block w-1/3 mt-2 p-2"
            />
          </label>
        </p>

        <p className="my-8">
          <label>
            Description{" "}
            <textarea
              name="description"
              className="border-solid border-2 border-gray-950 rounded block w-1/3 mt-2 p-2"
            />
          </label>
        </p>

        <p className="my-8">
          <label>
            Location{" "}
            <input
              type="text"
              name="location"
              className="border-solid border-2 border-gray-950 rounded block w-1/3 mt-2 p-2"
            />
          </label>
        </p>

        <p className="my-8">
          <label>
            Start time{" "}
            <DatePicker
              name="start"
              onChange={(date) => console.log(date)}
              className="border-solid border-2 border-gray-950 rounded mt-2 p-2"
            />
          </label>
        </p>

        <p className="my-8">
          <label>
            End time{" "}
            <DatePicker
              name="end"
              onChange={(date) => console.log(date)}
              className="border-solid border-2 border-gray-950 rounded mt-2 p-2"
            />
          </label>
        </p>
        <button className="text-white rounded-lg bg-blue-600 p-3">
          Submit
        </button>
      </Form>
    </main>
  );
}
