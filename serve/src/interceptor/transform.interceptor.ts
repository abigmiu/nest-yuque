import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response, Request } from 'express';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const host = context.switchToHttp();
        const res = host.getResponse<Response>();
        const req = host.getRequest<Request>();

        return next.handle().pipe(
            map((data) => {
                if (res.statusCode === HttpStatus.CREATED && req.method === 'POST') {
                    res.statusCode = HttpStatus.OK;
                }
                return {
                    code: 200,
                    data,
                    message: 'success',
                };
            }),
        );
    }
}
