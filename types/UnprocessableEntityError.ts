import { ErrorResponse, ErrorResponseJSON } from './ErrorResponse'

export interface UnprocessableEntityJSON extends ErrorResponseJSON {
  details: { [key: string]: string }
}
export class UnprocessableEntityError extends ErrorResponse {
  details: { [key: string]: string }

  constructor(
    message: string,
    technicalMessage: string,
    internalCode: string,
    details: { [key: string]: string },
  ) {
    super(message, technicalMessage, internalCode)
    this.details = details
  }

  toJson(): UnprocessableEntityJSON {
    return {
      message: this.message,
      technicalMessage: this.technicalMessage,
      internalCode: this.internalCode,
      details: this.details,
    }
  }
}
