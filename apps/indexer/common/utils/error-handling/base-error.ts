enum BaseErrorType {
  "INTERNAL",
  "NETWORK",
  "UNKNOWN",
}

type BaseErrorPublicOptions = {
  details: string;
  error_type: BaseErrorType;
  status: number;
  title: string;
};

type BaseErrorPrivateOptions = {
  internal_message: string;
  is_operational: boolean;
};

type BaseErrorOptions = BaseErrorPublicOptions & BaseErrorPrivateOptions;

export class BaseError extends Error {
  public readonly details: string;
  public readonly error_type: BaseErrorType;
  public readonly status: number;
  public readonly title: string;

  public readonly internal_message: string;
  public readonly is_operational: boolean;

  constructor(options?: BaseErrorOptions) {
    const {
      title,
      details,
      error_type,
      status,
      internal_message,
      is_operational,
    } = {
      details:
        "Oops... something unexpected occurred on the server. The developer will be notified.",
      error_type: BaseErrorType.INTERNAL,
      internal_message: "no message",
      is_operational: true,
      status: 500,
      title: "Internal Server Error",
      ...options,
    };

    super();
    // restore prototype chain that "message" breaks.
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = "BaseError";

    this.details = details;
    this.error_type = error_type;
    this.status = status;
    this.title = title;

    this.internal_message = internal_message;
    this.is_operational = is_operational;

    Error.captureStackTrace(this, this.constructor);
  }

  safeDescribe(): BaseErrorPublicOptions {
    return {
      details: this.details,
      error_type: this.error_type,
      status: this.status,
      title: this.title,
    };
  }

  unsecureDescribe(): BaseErrorOptions & {
    message: Error["message"];
    stack: Error["stack"];
  } {
    return {
      ...this.safeDescribe(),
      internal_message: this.internal_message,
      is_operational: this.is_operational,
      message: this.message,
      stack: this.stack,
    };
  }
}
