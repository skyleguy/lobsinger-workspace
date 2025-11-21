# AAT

## What it does

This application is designed for handling the tracking of assets via the use of QR Codes. QR codes are attached to the devices with the urls of whatever the domain name is this app is deployed to, along with /{assetType}/{assetId}. for example if deployed to a domain called asset-tracker.com the QR code attached to each device should be something like: https://asset-tracker.com/order/12345. When this application is opened it presents a scanner which should be used to scan QR codes in that format. If the QR Code is scanned and it is valid you will be taken to a page to enter details about the asset, which also uses a google API to get your current address, and upon submission a google cloud function is triggered which writes to a Google Sheet. You can do the following operations on an asset:

1. Assign - marks the asset as being assigned to you (asset is with you and is your responsibility)
2. Set Up - marks the asset as being "set up" or "dropped off" at the location entered in the form and enters drop off time into the google sheet
3. Pick Up - Enters pick up time into the google sheet and marks that the asset is with you (does not clear any info about the row so you can still see where it was set up, who set it up versus who picked it up, and how long it was there)
4. Return - asset has been marked as being returned to home and the whole row in the google sheet is cleared

## Playwright Specs

This application does have a suite of playwright specs that are expected to be run locally only right now. It does make real API calls and thus some timeouts have been added to make room for if the google cloud functions are not already warm. Snapshots are taken in order to make sure there are only expected visual regressinos between changes and you will have to update these snapshots if the UI changes in an expected way.

The specs makes use of a mock video file that should be a video of a valid QR code being shown to the camera. I've used Quicktime Player to take a video, iMovie to trim and crop the video to make it as small as possible, and then installed ffmpeg via brew so i can run:

`ffmpeg -i my-file-exported-from-imovie.mp4 -pix_fmt yuv420p my-playwright-mock-video-file.y4m`

This is seemingly the only format you can use in the playwright.config.ts file to use a fake stream in place of the real user's camera

a `.env` file needs to be placed inside the /aat folder that looks like this:

```
// details here https://firebase.google.com/docs/app-distribution/authenticate-service-account?platform=ios
SERVICE_ACCOUNT=your_admin_service_account_json_as_string
USER_UID=your_user_id_taken_from_firebase_console
FAKE_QR_VIDEO_PATH=your/path/to/generated/.y4m
```

to run the playwright specs in headed mode:

`npx nx e2e aat --ui --skip-nx-cache`

headless mode

`npx nx e2e aat --skip-nx-cache`

and to update screenshots

`npx nx e2e aat --ui -u --skip-nx-cache`
