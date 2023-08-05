import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, map } from "rxjs";

export interface RemoveResponse {
  removed: number;
}

@Injectable()
export class ResultInterceptor<T> implements NestInterceptor<T, RemoveResponse> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<RemoveResponse> {
    return next.handle().pipe(
      map(data => ({ removed: data.affected })),
    );
  }
}