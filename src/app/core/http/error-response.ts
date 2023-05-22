import { HttpErrorResponse } from "@angular/common/http";
import { CodeService } from "./code-response.interface";

export class BaseErrorResponse {
  stack?: string | undefined;
  code!: number;
  message!: string;
  stackTrace: any;
  constructor(err: HttpErrorResponse) {
    this._parseError(err);
  }


  private _parseError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      this.message = err.error.message;
      this.code = CodeService.ValidateError;
      this.stackTrace = err.error.stack;
    } else {
      this.code = err.status;
      this.message = err.message;
      this.stackTrace = JSON.stringify(err.error);
    }
  }
}
