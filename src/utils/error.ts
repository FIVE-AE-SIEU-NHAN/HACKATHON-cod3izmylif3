import HTTP_STATUS from '~/constant/httpStatus'

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

type ErrorsType = Record<
  string,
  {
    message: string
    [key: string]: any //này nghĩa là ngoài ra muốn thêm vào gì thì thêm
  }
>

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  //truyền message mặt định
  constructor({ message = 'Validation error', errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY }) //tạo lỗi có status 422
    this.errors = errors
  }
}
