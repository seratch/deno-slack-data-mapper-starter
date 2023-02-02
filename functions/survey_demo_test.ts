import * as mf from "mock_fetch/mod.ts";
import { assertEquals } from "std/testing/asserts.ts";
import {
  DefineDatastore,
  Schema,
  SlackFunctionTester,
} from "deno-slack-sdk/mod.ts";

import handler from "./survey_demo.ts";

mf.install();

const itemResponse = {
  "ok": true,
  "datastore": "suveys",
  "item": {
    "id": "123",
    "title": "Off-site event ideas",
    "questions": [
      "Can you share a fun idea for our off-site event in December?",
    ],
    "closed": false,
  },
};
const itemsResponse = {
  "ok": true,
  "datastore": "suveys",
  "items": [
    {
      "id": "123",
      "title": "Off-site event ideas",
      "questions": [
        "Can you share a fun idea for our off-site event in December?",
      ],
      "closed": false,
    },
  ],
};

mf.mock("POST@/api/apps.datastore.put", () => {
  return new Response(
    JSON.stringify(itemResponse),
    { status: 200 },
  );
});
mf.mock("POST@/api/apps.datastore.get", () => {
  return new Response(
    JSON.stringify(itemResponse),
    { status: 200 },
  );
});
mf.mock("POST@/api/apps.datastore.query", () => {
  return new Response(
    JSON.stringify(itemsResponse),
    { status: 200 },
  );
});
mf.mock("POST@/api/apps.datastore.delete", () => {
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
});

export const Surveys = DefineDatastore(
  {
    name: "surveys",
    primary_key: "id",
    attributes: {
      id: { type: Schema.types.string, required: true },
      title: { type: Schema.types.string, required: true },
      questions: {
        type: Schema.types.array,
        items: { type: Schema.types.string },
        required: true,
      },
      maxParticipants: { type: Schema.types.number }, // optional
      closed: { type: Schema.types.boolean, required: true },
    },
  } as const,
);

const { createContext } = SlackFunctionTester("my-function");

Deno.test("Run the demo function", async () => {
  const { outputs, error } = await handler(createContext({ inputs: {} }));
  assertEquals(outputs, {});
  assertEquals(error, undefined);
});
