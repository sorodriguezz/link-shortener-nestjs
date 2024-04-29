import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enlace } from './enlace.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Enlace)
    private readonly enlaceRepository: Repository<Enlace>,
  ) {}

  async crearEnlace(urlOriginal: string): Promise<Enlace> {
    const enlace = new Enlace();
    enlace.urlOriginal = urlOriginal;
    enlace.slug = this.generarSlug();
    enlace.fechaExpiracion = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 semana

    return this.enlaceRepository.save(enlace);
  }

  async obtenerUrlOriginal(slug: string): Promise<string> {
    const enlace = await this.enlaceRepository.findOne({
      where: { slug, fechaExpiracion: MoreThan(new Date()) },
    });

    if (!enlace) {
      throw new NotFoundException('Enlace no encontrado o expirado.');
    }

    return enlace.urlOriginal;
  }

  private generarSlug(): string {
    // Generar un slug único. Esta es una implementación muy básica.
    return Math.random().toString(36).substring(2, 8);
  }
}
