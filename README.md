helpful nx commands:

# change as needed for the lib being generate

nx generate @nx/angular:library --name=client/kyai/tailwind/ui --projectNameAndRootFormat=derived --style=scss --tags="scope:client, type:ui" --no-interactive

nx generate @nx/js:library --name=client/kyai/chat/data --unitTestRunner=jest --projectNameAndRootFormat=derived --tags="scope:client, type:data" --no-interactive

## Secrets

the following secrets will need to be placed in a .env file at the root of the folder:

- NX_CLOUD_ACCESS_TOKEN | Needed for nx cloud services
- OPEN_AI_API_KEY | Needed for making calls to open ai
