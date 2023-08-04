// api-file.decorator.ts
import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

export function ApiFile() {
  return applyDecorators(
    ApiBody({
      schema: {
        type: "object",
        properties: {
          file: {
            type: "string",
            format: "binary",
          },
        },
      },
    }),
    ApiConsumes("multipart/form-data"),
  );
}
