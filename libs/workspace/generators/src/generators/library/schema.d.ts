export type LibraryTypes = 'feature' | 'data-access' | 'ui' | 'util' | 'data' | 'widget';

export interface LibraryGeneratorSchema {
  name: string;
  application: 'glist' | 'shared';
  scope: 'client' | 'shared';
  libTypes: LibraryTypes[];
}