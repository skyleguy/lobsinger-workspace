import { Location, Scene } from './location';

export interface Navigatable {
  navigate(location: Location, scene?: Scene): void;
}
