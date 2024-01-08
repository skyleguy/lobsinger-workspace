helpful nx commands:

# change as needed for the lib being generate

nx generate @nx/angular:library --name=client/kyai/tailwind/ui --projectNameAndRootFormat=derived --style=scss --tags="scope:client, type:ui" --no-interactive

nx generate @nx/js:library --name=client/kyai/chat/data --unitTestRunner=jest --projectNameAndRootFormat=derived --tags="scope:client, type:ui" --no-interactive
