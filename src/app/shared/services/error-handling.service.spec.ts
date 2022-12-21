// @ts-nocheck
import {TestBed} from "@angular/core/testing";
import {ErrorHandlingService} from "./error-handling.service";
import {HttpErrorResponse} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ErrorHandlingService', () => {
  let errorHandlingService: ErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    errorHandlingService = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', function () {
    expect(errorHandlingService).toBeTruthy();
  });

  it("Should return error 'De gebruiker is niet gevonden'", () => {
    //Arrange
    const errorResponse = new HttpErrorResponse({
      error: {code: `404`, message: `USER_NOT_FOUND`},
      status: 404,
      statusText: 'Not Found',
    });

    const expectedResult = 'De gebruiker is niet gevonden'
    let actualError = '';

    //Act
    let errorSubscription = errorHandlingService.handleError(errorResponse)
    errorSubscription.subscribe({
      error: message => {
        actualError = message;
      }
    });

    //Assert
    expect(actualError).toBe(expectedResult);
  });
})
