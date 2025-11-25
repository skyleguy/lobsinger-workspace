import { definePreset } from '@primeng/themes';
import aura from '@primeng/themes/aura';
import lara from '@primeng/themes/lara';
import nora from '@primeng/themes/nora';
import material from '@primeuix/themes/material';
import { PrimeNGConfigType } from 'primeng/config';

import { darkThemeSelector } from './theme.constants';

interface PrimengConfigOptions {
  basePreset?: 'aura' | 'lara' | 'nora' | 'material';
  primaryColor?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'orange' | 'indigo' | 'cyan' | 'teal' | 'gray';
  isDarkModeEnabled?: boolean;
  isDarkModeEnabledViaClass?: boolean;
  ripple?: boolean;
}

function getPrimengPreset(options?: PrimengConfigOptions) {
  let basePreset: Record<string, unknown>;
  switch (options?.basePreset) {
    case 'lara':
      basePreset = lara;
      break;
    case 'nora':
      basePreset = nora;
      break;
    case 'material':
      basePreset = material;
      break;
    case 'aura':
    default:
      basePreset = aura;
      break;
  }
  const primaryColor = options?.primaryColor ?? 'green';
  return definePreset(basePreset, {
    semantic: {
      primary: {
        50: `{${primaryColor}.50}`,
        100: `{${primaryColor}.100}`,
        200: `{${primaryColor}.200}`,
        300: `{${primaryColor}.300}`,
        400: `{${primaryColor}.400}`,
        500: `{${primaryColor}.500}`,
        600: `{${primaryColor}.600}`,
        700: `{${primaryColor}.700}`,
        800: `{${primaryColor}.800}`,
        900: `{${primaryColor}.900}`,
        950: `{${primaryColor}.950}`
      }
    },
    components: {
      card: {
        body: {
          padding: '0.75rem'
        }
      }
    }
  });
}

export function getPrimengConfig(options?: PrimengConfigOptions): PrimeNGConfigType {
  const primengConfig = {
    ripple: options?.ripple ?? false,
    theme: {
      preset: getPrimengPreset(options),
      options: {
        darkModeSelector: options?.isDarkModeEnabledViaClass ? darkThemeSelector : !!options?.isDarkModeEnabled,
        cssLayer: {
          name: 'primeng',
          order: 'theme, base, primeng'
        }
      }
    }
  };
  return primengConfig;
}
