import { BaseException } from './base.exception';

export class InvalidRequestException extends BaseException {
  constructor(code: string, message?: string) {
    super(code, message);
    this.name = 'invalid_request_exception';
  }
}
