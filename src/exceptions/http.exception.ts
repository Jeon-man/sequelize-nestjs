import C from '@constant';

export class HttpException extends Error {
  status: number;
  message: string;

  constructor(key: keyof typeof C.ErrorCodes) {
    super(C.ErrorCodes[key].message);
    this.status = C.ErrorCodes[key].status;
    this.message = C.ErrorCodes[key].message;
  }
}
