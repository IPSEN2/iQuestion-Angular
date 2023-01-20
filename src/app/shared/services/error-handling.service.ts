import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {ErrorModel} from "../error.model";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class ErrorHandlingService{
  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Er is iets misgegaan!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(() => errorMessage);
    }

    for (const [key, value] of ErrorModel.errorMap) {
      if (errorRes.error.message === key) {
        errorMessage = value;
        break;
      }
    }
    return throwError(() => errorMessage);
  }
}
