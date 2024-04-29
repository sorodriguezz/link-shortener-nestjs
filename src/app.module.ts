import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enlace } from './enlace.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.100.49',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'postgres',
      entities: [Enlace],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Enlace]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
