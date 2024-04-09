import { BaseException } from './base.exception';

export class ApiConnectionException extends BaseException {
  constructor(code: string, message?: string) {
    super(code, message);
    this.name = 'api_connection_exception';
  }
}
