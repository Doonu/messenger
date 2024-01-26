import {forwardRef, Module} from '@nestjs/common';
import { FilesService } from './files.service';
import {FilesController} from "./files.controller";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
  imports: [
    forwardRef(() => AuthModule)
  ]
})
export class FilesModule {}
