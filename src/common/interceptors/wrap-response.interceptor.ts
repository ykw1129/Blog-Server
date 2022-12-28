import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
export interface Response<T> {
  statusCode: number;
  message: string;
  currentDate: Date | string;
  data: T;
}
@Injectable()
export class WrapResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const { message, ...newData } = data;
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message || '',
          currentDate: new Date().toISOString(),
          data: newData.list ? newData.list : newData,
        };
      }),
    );
  }
}
