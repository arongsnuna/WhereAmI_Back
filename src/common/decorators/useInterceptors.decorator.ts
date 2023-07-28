// api-file.decorator.ts
import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
//import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';

export function ApiFile() {
  return applyDecorators(
    UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads',  // 파일이 저장될 위치
          filename: (req, file, callback) => {
            callback(null, `${Date.now()}-${file.originalname}`);  // 파일 이름
          }
        }),
        limits: { fileSize: 1024 * 1024 * 5 }  // 파일 크기 제한: 5MB
    })),
  );
}