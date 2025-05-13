import { signalStoreFeature, withState } from '@ngrx/signals';

export enum ComponentStatus {
  Idle,
  Loading,
  Loaded
}

export interface ComponentState {
  status: ComponentStatus;
}

export function withComponentState() {
  return signalStoreFeature(
    withState<ComponentState>({
      status: ComponentStatus.Idle
    })
  );
}

export function setStatus(status: ComponentStatus): Partial<ComponentState> {
  return { status };
}
