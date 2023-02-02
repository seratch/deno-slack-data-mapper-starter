# deno-slack-data-mapper project template

## Getting Started

You can generate a new project using this template by the following command:

````bash
slack create data-mapper-app -t seratch/deno-slack-data-mapper-starter
cd ./data-mapper-app
```

Run its dev app in a terminal first:

```bash
slack run
````

And then, you can generate a webhook trigger in a different terminal, and run
the workflow via the URL:

```bash
slack trigger create --trigger-def ./triggers/survey_webhook.ts
curl -XPOST https://hooks.slack.com/triggers/T12345/...
```
