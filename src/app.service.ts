import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enlace } from './enlace.entity';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Enlace)
    private readonly enlaceRepository: Repository<Enlace>,
  ) {}

  async crearEnlace(
    urlOriginal: string,
    fechaExpiracion: string,
  ): Promise<Enlace> {
    let fechaExp: Date | undefined = undefined;

    if (fechaExpiracion) {
      fechaExp = new Date(fechaExpiracion);

      if (isNaN(fechaExp.getTime())) {
        throw new BadRequestException('Fecha de expiración inválida.');
      }
    }

    const enlace = new Enlace();
    enlace.urlOriginal = urlOriginal;
    enlace.slug = v4();
    enlace.fechaExpiracion = fechaExp || null;

    return this.enlaceRepository.save(enlace);
  }

  async obtenerUrlOriginal(slug: string): Promise<string> {
    const enlace = await this.enlaceRepository.findOne({
      where: {
        slug,
      },
    });

    if (!enlace) {
      throw new NotFoundException('Enlace no encontrado.');
    }

    if (enlace.fechaExpiracion) {
      if (enlace.fechaExpiracion < new Date()) {
        throw new NotFoundException('Enlace expirado.');
      }
    }

    return enlace.urlOriginal;
  }

  async getAll() {
    return await this.enlaceRepository.find({
      select: {
        slug: true,
        fechaExpiracion: true,
        urlOriginal: true,
        fechaCreacion: true,
      },
    });
  }
}
