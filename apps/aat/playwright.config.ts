import { Credentials } from '@nearform/playwright-firebase';
import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

const FAKE_VIDEO_PATH = process.env['FAKE_QR_VIDEO_PATH'] ?? '';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<Credentials>({
  ...nxE2EPreset(__filename, { testDir: './e2e' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx nx serve aat',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    cwd: workspaceRoot
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        permissions: ['camera', 'geolocation'],
        launchOptions: {
          args: [
            '--use-fake-device-for-media-stream',
            `--use-file-for-fake-video-capture=${FAKE_VIDEO_PATH}`,
            '--use-fake-ui-for-media-stream'
          ]
        }
      }
    },
    {
      name: 'mobile-chromium',
      use: {
        ...devices['Desktop Chrome'],
        permissions: ['camera', 'geolocation'],
        launchOptions: {
          args: [
            '--use-fake-device-for-media-stream',
            `--use-file-for-fake-video-capture=${FAKE_VIDEO_PATH}`,
            '--use-fake-ui-for-media-stream'
          ]
        },
        viewport: {
          width: 375,
          height: 667
        }
      }
    }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] }
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // }

    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ]
});
