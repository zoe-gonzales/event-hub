import { Form } from "@remix-run/react";

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
        <input name="start" />
        <input name="end" />
      </Form>
    </main>
  );
}
