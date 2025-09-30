export type LibraryTypes = 'feature' | 'data-access' | 'ui' | 'util' | 'data';

export interface LibraryGeneratorSchema {
  name: string;
  application: 'glist' | 'aat' | 'shared' | 'null';
  scope: 'client' | 'shared';
  libTypes: LibraryTypes[];
}
