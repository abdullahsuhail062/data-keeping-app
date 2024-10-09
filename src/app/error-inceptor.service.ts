import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


let errorMessage = '';

 export function errorInceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>{
    return next(req).pipe(catchError(handleError))
    }

   const handleError =(err: HttpErrorResponse): Observable<never> => {
    
      if (err.status=== 400) {
            
            return throwError(()=> (err.error.errors))
            
      }else if (err.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Client-side error: ${err.error.message}`;
  }
        
    
    
      // Return an observable with an error message
      return throwError(() => new Error(errorMessage));
    };
  
   
  
