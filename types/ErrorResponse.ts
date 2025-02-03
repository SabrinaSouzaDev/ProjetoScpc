export type ErrorResponseJSON = {
  message: string
  technicalMessage: string
  internalCode: string
}

export class ErrorResponse extends Error {
  technicalMessage: string
  internalCode: string

  constructor(message: string, technicalMessage: string, internalCode: string) {
    super(message)
    this.technicalMessage = technicalMessage
    this.internalCode = internalCode
  }

  static fromPayload(payload: string) {
    const data = JSON.parse(payload)
    return new ErrorResponse(
      data.message,
      data.technicalMessage,
      data.internalCode,
    )
  }

  static fromError(payload: Error) {
    const data = JSON.parse(payload.message)
    return new ErrorResponse(
      data.message,
      data.technicalMessage,
      data.internalCode,
    )
  }

  toJson(): ErrorResponseJSON {
    return {
      message: this.message,
      technicalMessage: this.technicalMessage,
      internalCode: this.internalCode,
    }
  }
}
