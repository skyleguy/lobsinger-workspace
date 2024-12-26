import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import got from "got";
import { defineSecret } from "firebase-functions/params";
// import * as sheets from '@googleapis/sheets';

const locationsApiKey = defineSecret("GOOGLE_LOCATIONS_API_KEY");
const allowedOrigins = ["http://localhost:4200"];

export const getCurrentAddress = onRequest(
  {
    secrets: [locationsApiKey],
    cors: allowedOrigins
  },
  async (request, response) => {
    const latitude: number = request.body?.data?.latitude;
    const longitude: number = request.body?.data?.longitude;
    logger.info(`getCurrentAddress called with: ${latitude} | ${longitude}`);
    const apiKey = locationsApiKey.value();
    const res: { results: { formatted_address: string }[] } = await got
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
      .json();
    const firstAddress = res.results?.[0]?.formatted_address;
    response.send({ data: firstAddress });
  }
);

export const checkoutAsset = onRequest(
  {
    cors: allowedOrigins
  },
  (request, response) => {
    const data = request.body?.data;
    const address: string = data?.address;
    const roomLocation: string = data?.roomLocation;
    const inspector: string = data?.inspector;
    const assetName: string = data?.assetName;
    const assetId: string = data?.assetId;
    const currentTime = new Date();
    response.send({ data: `${address} | ${roomLocation} | ${inspector} | ${assetName} | ${assetId} | ${currentTime}` });
  }
);
