import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Material from '@primeng/themes/aura';
import { withThemeByClassName } from '@storybook/addon-themes';
import { applicationConfig, Preview } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';
import './styles.css';

const darkModeSelector = 'dark';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: darkModeSelector
      },
      defaultTheme: 'light',
      parentSelector: 'html'
    }),
    applicationConfig({
      providers: [
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: Material,
            options: {
              darkModeSelector: `.${darkModeSelector}`,
              cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng'
              }
            }
          }
        })
      ]
    })
  ]
};

export default preview;
