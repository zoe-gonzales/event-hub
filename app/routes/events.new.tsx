import { Form } from "@remix-run/react";
import DatePicker from "react-datepicker";

export default function EventRoute() {
  return (
    <main>
      <h1>Create a new event</h1>
      <Form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Description:
          <textarea name="description" />
        </label>
        <label>
          <input type="text" name="location" />
        </label>
        <DatePicker name="start" onChange={(date) => console.log(date)} />
        <DatePicker name="end" onChange={(date) => console.log(date)} />
      </Form>
    </main>
  );
}
