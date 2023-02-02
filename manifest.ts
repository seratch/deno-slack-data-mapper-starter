import { Manifest } from "deno-slack-sdk/mod.ts";
import { Surveys } from "./datastores/surveys.ts";
import { workflow as SurveyDemo } from "./workflows/survey_demo.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "slack-data-mapper-starter",
  description: "A data mapper project template",
  icon: "assets/default_new_app_icon.png",
  datastores: [Surveys],
  workflows: [SurveyDemo],
  functions: [],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
});
