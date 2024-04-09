import { BaseException } from './base.exception';

export class ApiException extends BaseException {
  constructor(code: string, message?: string) {
    super(code, message);
    this.name = 'api_exception';
  }
}
