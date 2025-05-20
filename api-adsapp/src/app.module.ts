import { Module } from '@nestjs/common';
import { EstudianteModule } from './estudiante/estudiante.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'henry',
      database: 'dbads',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EstudianteModule
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
