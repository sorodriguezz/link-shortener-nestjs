import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async crearEnlace(
    @Body('urlOriginal') urlOriginal: string,
    @Body('fechaExpiracion') fechaExpiracion?: string,
  ) {
    const enlace = await this.appService.crearEnlace(
      urlOriginal,
      fechaExpiracion,
    );
    return { slug: enlace.slug, urlOriginal: enlace.urlOriginal };
  }

  @Get(':slug')
  @Redirect()
  async obtenerUrlOriginal(@Param('slug') slug: string) {
    const urlOriginal = await this.appService.obtenerUrlOriginal(slug);
    return { url: urlOriginal };
  }

  @Get()
  async getAll() {
    return await this.appService.getAll();
  }
}
