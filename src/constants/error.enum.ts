import { StatusCodes } from './httpStatus.enum';

export const ErrorCodes = {
  UNDEFINED_ERROR: {
    message: '알 수 없는 오류가 발생하였습니다.',
    status: StatusCodes.INTERNAL_SERVER_ERROR,
  },
};
