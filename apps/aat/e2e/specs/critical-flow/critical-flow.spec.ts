import { expect } from '@playwright/test';

import { interceptFirebaseRequests, interceptGoogleRequests } from '../../routes';
import { test } from '../../setup/auth.setup';

/**
 * when needing to re-record har files just set this to true and all marked requests will be recorded
 */
const isRecordingTraffic = false;

test('not signed in', async ({ page }) => {
  const projectName = test.info().project.name;
  await page.goto('/');
  expect(page.url()).toContain('/scan');
  const signInButton = page.locator('[data-test="sign-in-button"]');
  await expect(signInButton).toBeVisible();
  await expect(page).toHaveScreenshot(`not-signed-in-${projectName}.png`);
});

test('critical signed in flow', async ({ auth, context }) => {
  interceptFirebaseRequests(context, isRecordingTraffic);
  interceptGoogleRequests(context, isRecordingTraffic);

  const projectName = test.info().project.name;
  const fakeLocation = { latitude: 37.7749, longitude: -122.4194 };
  await context.setGeolocation(fakeLocation);
  const page = await context.newPage();
  await page.goto('/');
  await auth.login(page);
  await page.reload();

  const userImage = page.locator('[data-test="user-image"]');
  await expect(userImage).toBeVisible();
  const cameraLoading = page.locator('[data-test="camera-loading"]');
  await expect(cameraLoading).toBeHidden();

  await expect(page.locator('[data-test="asset-track-container"]')).toBeVisible();
  expect(page.url()).toContain('/radon/12');
  const addressInput = page.locator('[data-test="asset-address"]');
  await expect(addressInput).toHaveValue(/San Francisco/);
  await expect(page).toHaveScreenshot(`set-up-disabled-${projectName}.png`);

  const roomInput = page.locator('[data-test="asset-room-location"]');
  await expect(roomInput).toBeVisible();
  roomInput.click();
  await expect(page.locator('ul')).toBeVisible();
  const selectItems = await page.locator('p-selectitem').all();
  expect(selectItems.length).toBeGreaterThan(1);
  selectItems[1]?.click();
  await expect(page).toHaveScreenshot(`form-filled.png-${projectName}.png`);

  const assignAssetButton = page.locator('[data-test="assign-asset-button"]');
  await assignAssetButton.click();
  const loading = page.locator('p-progress-spinner');
  await expect(loading).toBeHidden();
  await expect(page).toHaveScreenshot(`after-submit-${projectName}.png`);

  const backButton = page.locator('[data-test="back-button"]:visible');
  await backButton.click();
  expect(page.url()).toContain('/scan');
  await context.close();
});
