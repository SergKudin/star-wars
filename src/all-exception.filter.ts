import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error('Exception:', exception);
    this.logger.error('Stack trace:', exception.stack);

    const response = host.switchToHttp().getResponse();
    response.status(500).json({
      message: 'Internal Server Error',
      error: exception.toString(),
      stack: exception.stack,
    });
  }
}