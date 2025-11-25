# NX Dockerfiles

## Objective

The purpose of these files is to provide a base dockerfile that can be used with arguments in order to fulfill the use for each "type" of application in the monorepo to be built into docker image and deployed to a docker repository. Ideally
there will be an nx executor that takes the tags of an app and sees the docker build target in order to call the correct command using the correct Dockerfile base here.

## Helpful Commands

Right now we only support angular ssr applications so in order to build, for example, the aat app using our angular ssr dockerfile base you would run (ideally latest would be replaced with a specific version, such as the one in the package.json at time of run):

`docker build --file docker/Dockerfile.angular-ssr -t aat:latest --build-arg APP_NAME=aat .`

and once that builds you can use the image to make a container like so:

`docker run -d -p 4000:4000 aat:latest`

and then open up `localhost:4000` and see your application!

## Pushing to a container repository

For this repo right now we've decided to go with GitHub Container Repository as our container repository. In order to push to this you must tag your image in a specific way like so:

`docker tag aat ghcr.io/skyleguy/aat:latest`

and then push like so:

`docker push ghcr.io/skyleguy/aat:latest`
