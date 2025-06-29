import { Request, Response, NextFunction } from 'express'
import { ErrorWithStatus } from './error'
import HTTP_STATUS from '~/constant/httpStatus'
import { omit } from 'lodash'

export const defaultErorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  // lỗi của toàn bộ hệ thống đổ về đây
  if (error instanceof ErrorWithStatus) {
    res.status(error.status).json(omit(error, ['status']))
  } else {
    Object.getOwnPropertyNames(error).forEach((key) => {
      Object.defineProperty(error, key, {
        enumerable: true
      })
    })
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      errorInfor: omit(error, ['stack'])
    })
  }
}
