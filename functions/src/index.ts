import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import axios from 'axios';
import { defineSecret, defineString } from 'firebase-functions/params';
import { google } from 'googleapis';
import { addDays, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const locationsApiKey = defineSecret('GOOGLE_LOCATIONS_API_KEY');
const allowedOrigins = ['http://localhost:4200', 'https://lobsinger-workspace-aat--lobsinger-workspace-dev-e45e7.us-central1.hosted.app'];

const spreadsheetIdParam = defineString('SPREADSHEET_ID');
const credentialsGoogleCloudFileLocationParam = defineString(`CREDENTIALS_GOOGLE_CLOUD_FILE_LOCATION`);
const sheetRangeParam = defineString(`SHEET_RANGE`);

const client = new SecretManagerServiceClient();

async function getAuth() {
  const [accessResponse] = await client.accessSecretVersion({
    name: credentialsGoogleCloudFileLocationParam.value() // if we ever need this earlier we can try the onInit(() => {}) approach
  });

  const credentials = JSON.parse(accessResponse?.payload?.data?.toString() ?? '');
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
}

export const getCurrentAddress = onRequest(
  {
    secrets: [locationsApiKey],
    cors: allowedOrigins
  },
  async (request, response) => {
    const latitude: number = request.body?.data?.latitude;
    const longitude: number = request.body?.data?.longitude;
    logger.info(`Address retrieval called with: ${latitude} | ${longitude}`);
    const apiKey = locationsApiKey.value();
    const res: { results: { formatted_address: string }[] } = (
      await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
    ).data;
    const firstAddress = res.results?.[0]?.formatted_address;
    response.send({ data: firstAddress });
  }
);

export const setUpAsset = onRequest(
  {
    cors: allowedOrigins
  },
  async (request, response) => {
    const auth = await getAuth();

    const data = request.body?.data;
    const address: string = data?.address;
    const roomLocation: string = data?.roomLocation;
    const inspector: string = data?.inspector;
    const assetName: string = data?.assetName;
    const assetId: string = data?.assetId;

    const initialSheetRange = `${assetName}!${sheetRangeParam.value()}`;
    const spreadsheetId = spreadsheetIdParam.value();
    try {
      const spreadsheet = await google.sheets('v4').spreadsheets.values.get({ spreadsheetId, auth, range: initialSheetRange });
      const sheetData = spreadsheet.data.values;
      if (sheetData) {
        const monitorRowIndex = sheetData.findIndex((row) => row?.[3]?.trim() === `Monitor #${assetId}`);
        if (monitorRowIndex >= 0) {
          const localDate = toZonedTime(new Date(), 'America/New_York');
          const monitorRow = sheetData[monitorRowIndex];
          const currentTimeDate = format(localDate, 'MM/dd/yyyy');
          const currentTimeHours = format(localDate, 'h:mm');
          const newMonitorRow = [...monitorRow];
          newMonitorRow[5] = '';
          newMonitorRow[6] = currentTimeDate;
          newMonitorRow[8] = currentTimeHours;
          newMonitorRow[10] = address;
          newMonitorRow[12] = inspector;
          newMonitorRow[14] = roomLocation;
          newMonitorRow[16] = format(addDays(currentTimeDate, 2), 'MM/dd/yyyy');
          const updateRowRange = `${assetName}!A${monitorRowIndex + 1}:V${monitorRowIndex + 1}`;
          try {
            await google.sheets('v4').spreadsheets.values.update({
              auth,
              spreadsheetId,
              range: updateRowRange,
              valueInputOption: 'RAW',
              requestBody: {
                values: [newMonitorRow]
              }
            });
            const successMessage = `Asset ${assetName} ${assetId} successfully set up by ${inspector}`;
            logger.info(successMessage);
            response.status(200).send({ data: successMessage });
          } catch (e) {
            const error = `Setting up asset ${assetName} ${assetId} by ${inspector} failed due to: ${JSON.stringify(e)}`;
            logger.error(error);
            response.status(500).send({
              data: error
            });
          }
        } else {
          const error = `No asset ${assetName} ${assetId} found to set up by ${inspector}`;
          logger.error(error);
          response.status(400).send({
            data: error
          });
        }
      } else {
        const error = `No sheet data found for the sheet ${spreadsheetId} with initial range ${initialSheetRange}`;
        logger.error(error);
        response.status(404).send({
          data: error
        });
      }
    } catch (e) {
      const error = `Attempt to fetch sheet data for sheet id ${spreadsheetId} with initial range ${initialSheetRange} failed due to ${JSON.stringify(e)}`;
      logger.error(error);
      response.status(500).send({
        data: error
      });
    }
  }
);

export const pickUpAsset = onRequest(
  {
    cors: allowedOrigins
  },
  async (request, response) => {
    const auth = await getAuth();

    const data = request.body?.data;
    const assetName: string = data?.assetName;
    const assetId: string = data?.assetId;
    const inspector: string = data?.inspector;

    const initialSheetRange = `${assetName}!${sheetRangeParam.value()}`;
    const spreadsheetId = spreadsheetIdParam.value();
    try {
      const spreadsheet = await google.sheets('v4').spreadsheets.values.get({ spreadsheetId, auth, range: initialSheetRange });
      const sheetData = spreadsheet.data.values;
      if (sheetData) {
        const monitorRowIndex = sheetData.findIndex((row) => row?.[3]?.trim() === `Monitor #${assetId}`);
        if (monitorRowIndex >= 0) {
          const monitorRow = sheetData[monitorRowIndex];
          const newMonitorRow = [...monitorRow];
          newMonitorRow[5] = inspector;
          newMonitorRow[6] = '';
          newMonitorRow[8] = '';
          newMonitorRow[10] = '';
          newMonitorRow[12] = '';
          newMonitorRow[14] = '';
          newMonitorRow[16] = '';
          const updateRowRange = `${assetName}!A${monitorRowIndex + 1}:V${monitorRowIndex + 1}`;
          try {
            await google.sheets('v4').spreadsheets.values.update({
              auth,
              spreadsheetId,
              range: updateRowRange,
              valueInputOption: 'RAW',
              requestBody: {
                values: [newMonitorRow]
              }
            });
            const successMessage = `Asset ${assetName} ${assetId} successfully picked up by ${inspector}`;
            logger.info(successMessage);
            response.status(200).send({ data: successMessage });
          } catch (e) {
            const error = `Picking up asset ${assetName} ${assetId} by ${inspector} failed due to: ${JSON.stringify(e)}`;
            logger.error(error);
            response.status(500).send({
              data: error
            });
          }
        } else {
          const error = `No asset ${assetName} ${assetId} found to pick up by ${inspector}`;
          logger.error(error);
          response.status(400).send({
            data: error
          });
        }
      } else {
        const error = `No sheet data found for the sheet ${spreadsheetId} with initial range ${initialSheetRange}`;
        logger.error(error);
        response.status(404).send({
          data: error
        });
      }
    } catch (e) {
      const error = `Attempt to fetch sheet data for sheet id ${spreadsheetId} with initial range ${initialSheetRange} failed due to ${JSON.stringify(e)}`;
      logger.error(error);
      response.status(500).send({
        data: error
      });
    }
  }
);

export const returnAsset = onRequest(
  {
    cors: allowedOrigins
  },
  async (request, response) => {
    const auth = await getAuth();

    const data = request.body?.data;
    const assetName: string = data?.assetName;
    const assetId: string = data?.assetId;
    const inspector: string = data?.inspector;

    const initialSheetRange = `${assetName}!${sheetRangeParam.value()}`;
    const spreadsheetId = spreadsheetIdParam.value();
    try {
      const spreadsheet = await google.sheets('v4').spreadsheets.values.get({ spreadsheetId, auth, range: initialSheetRange });
      const sheetData = spreadsheet.data.values;
      if (sheetData) {
        const monitorRowIndex = sheetData.findIndex((row) => row?.[3]?.trim() === `Monitor #${assetId}`);
        if (monitorRowIndex >= 0) {
          const monitorRow = sheetData[monitorRowIndex];
          const newMonitorRow = [...monitorRow];
          newMonitorRow[5] = '';
          newMonitorRow[6] = '';
          newMonitorRow[8] = '';
          newMonitorRow[10] = '';
          newMonitorRow[12] = '';
          newMonitorRow[14] = '';
          newMonitorRow[16] = '';
          const updateRowRange = `${assetName}!A${monitorRowIndex + 1}:V${monitorRowIndex + 1}`;
          try {
            await google.sheets('v4').spreadsheets.values.update({
              auth,
              spreadsheetId,
              range: updateRowRange,
              valueInputOption: 'RAW',
              requestBody: {
                values: [newMonitorRow]
              }
            });
            const successMessage = `Asset ${assetName} ${assetId} successfully returned home by ${inspector}`;
            logger.info(successMessage);
            response.status(200).send({ data: successMessage });
          } catch (e) {
            const error = `Returning home asset ${assetName} ${assetId} by ${inspector} failed due to: ${JSON.stringify(e)}`;
            logger.error(error);
            response.status(500).send({
              data: error
            });
          }
        } else {
          const error = `No asset ${assetName} ${assetId} found to be returned home by ${inspector}`;
          logger.error(error);
          response.status(400).send({
            data: error
          });
        }
      } else {
        const error = `No sheet data found for the sheet ${spreadsheetId} with initial range ${initialSheetRange}`;
        logger.error(error);
        response.status(404).send({
          data: error
        });
      }
    } catch (e) {
      const error = `Attempt to fetch sheet data for sheet id ${spreadsheetId} with initial range ${initialSheetRange} failed due to ${JSON.stringify(e)}`;
      logger.error(error);
      response.status(500).send({
        data: error
      });
    }
  }
);
