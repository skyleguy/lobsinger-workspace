import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, input, Resource, ResourceStatus } from '@angular/core';

interface ErrorMessage {
  primary: string;
  secondary?: string;
}

@Component({
  imports: [],
  selector: 'shared-lifecycle-management-ui-resource-container',
  templateUrl: './resource-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceContainerComponent<T> {
  protected readonly resourceStatusEnum: typeof ResourceStatus = ResourceStatus;

  resource = input.required<Resource<T>>();

  protected readonly errorMessage = computed<ErrorMessage | null>(() => {
    const error = this.resource().error();
    if (error) {
      if (error instanceof HttpErrorResponse) {
        return {
          primary: `There was a(n) ${error.status} error`,
          secondary: `${error.statusText} ${error.message}`
        };
      }
      return {
        primary: 'There was an error',
        secondary: 'Please try this operation again later'
      };
    }
    return null;
  });
}
