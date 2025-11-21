import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { darkThemeClass, getPrimengConfig } from '@lob/client-shared-design-system-data';
import { withThemeByClassName } from '@storybook/addon-themes';
import { applicationConfig, Preview } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';

import './styles.css';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: darkThemeClass
      },
      defaultTheme: 'dark',
      parentSelector: 'html'
    }),
    applicationConfig({
      providers: [
        provideAnimationsAsync(),
        providePrimeNG(
          getPrimengConfig({
            basePreset: 'material',
            ripple: true,
            primaryColor: 'green',
            isDarkModeEnabledViaClass: true
          })
        )
      ]
    })
  ]
};

export default preview;
