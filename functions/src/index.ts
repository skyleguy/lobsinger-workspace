import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import axios from 'axios';
import { defineSecret } from 'firebase-functions/params';
import { google } from 'googleapis';
import { addDays, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const locationsApiKey = defineSecret('GOOGLE_LOCATIONS_API_KEY');
const allowedOrigins = ['http://localhost:4200', 'https://lobsinger-workspace-aat--lobsinger-workspace-dev-e45e7.us-central1.hosted.app'];

const spreadsheetId = '1EDbvb6s_4K69GF9Gi9cWdw6P_23hGnEr2vp7w_87kHg';

const client = new SecretManagerServiceClient();

async function getAuth() {
  const [accessResponse] = await client.accessSecretVersion({
    name: 'projects/151978710816/secrets/advantage_asset_tracker_sheets_service_account_credentials/versions/latest'
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

    const initialSheetRange = `${assetName}!A1:V12`;
    try {
      const spreadsheet = await google.sheets('v4').spreadsheets.values.get({ spreadsheetId, auth, range: initialSheetRange });
      const sheetData = spreadsheet.data.values;
      if (sheetData) {
        const monitorRowIndex = sheetData.findIndex((row) => row?.[1] === `Monitor #${assetId}`);
        if (monitorRowIndex >= 0) {
          const localDate = toZonedTime(new Date(), 'America/New_York');
          const monitorRow = sheetData[monitorRowIndex];
          const currentTimeDate = format(localDate, 'MM/dd/yyyy');
          const currentTimeHours = format(localDate, 'h:mm');
          const newMonitorRow = [...monitorRow];
          newMonitorRow[2] = '';
          newMonitorRow[5] = currentTimeDate;
          newMonitorRow[7] = currentTimeHours;
          newMonitorRow[9] = address;
          newMonitorRow[11] = inspector;
          newMonitorRow[13] = roomLocation;
          newMonitorRow[15] = format(addDays(currentTimeDate, 2), 'MM/dd/yyyy');
          newMonitorRow[17] = currentTimeHours;
          const updateRowRange = `${assetName}!A${monitorRowIndex + 1}:V${monitorRowIndex + 1}`;
          try {
            await google.sheets('v4').spreadsheets.values.update({
              auth,
              spreadsheetId,
              range: updateRowRange,
              valueInputOption: 'RAW',
              requestBody: {
                range: updateRowRange,
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

    const initialSheetRange = `${assetName}!A1:V12`;
    try {
      const spreadsheet = await google.sheets('v4').spreadsheets.values.get({ spreadsheetId, auth, range: initialSheetRange });
      const sheetData = spreadsheet.data.values;
      if (sheetData) {
        const monitorRowIndex = sheetData.findIndex((row) => row?.[1] === `Monitor #${assetId}`);
        if (monitorRowIndex >= 0) {
          const monitorRow = sheetData[monitorRowIndex];
          const newMonitorRow = [...monitorRow];
          newMonitorRow[2] = inspector;
          newMonitorRow[5] = '';
          newMonitorRow[7] = '';
          newMonitorRow[9] = '';
          newMonitorRow[11] = '';
          newMonitorRow[13] = '';
          newMonitorRow[15] = '';
          newMonitorRow[17] = '';
          const updateRowRange = `${assetName}!A${monitorRowIndex + 1}:V${monitorRowIndex + 1}`;
          try {
            await google.sheets('v4').spreadsheets.values.update({
              auth,
              spreadsheetId,
              range: updateRowRange,
              valueInputOption: 'RAW',
              requestBody: {
                range: updateRowRange,
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

    const initialSheetRange = `${assetName}!A1:V12`;
    try {
      const spreadsheet = await google.sheets('v4').spreadsheets.values.get({ spreadsheetId, auth, range: initialSheetRange });
      const sheetData = spreadsheet.data.values;
      if (sheetData) {
        const monitorRowIndex = sheetData.findIndex((row) => row?.[1] === `Monitor #${assetId}`);
        if (monitorRowIndex >= 0) {
          const monitorRow = sheetData[monitorRowIndex];
          const newMonitorRow = [...monitorRow];
          newMonitorRow[2] = '';
          newMonitorRow[5] = '';
          newMonitorRow[7] = '';
          newMonitorRow[9] = '';
          newMonitorRow[11] = '';
          newMonitorRow[13] = '';
          newMonitorRow[15] = '';
          newMonitorRow[17] = '';
          const updateRowRange = `${assetName}!A${monitorRowIndex + 1}:V${monitorRowIndex + 1}`;
          try {
            await google.sheets('v4').spreadsheets.values.update({
              auth,
              spreadsheetId,
              range: updateRowRange,
              valueInputOption: 'RAW',
              requestBody: {
                range: updateRowRange,
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
