import {forwardRef, Module} from '@nestjs/common';
import { FilesService } from './files.service';
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [],
  imports: [
    forwardRef(() => AuthModule)
  ]
})
export class FilesModule {}
