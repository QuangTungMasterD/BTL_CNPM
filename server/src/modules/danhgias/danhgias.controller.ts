import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { DanhgiasService } from './danhgias.service';
import { CreateDanhgiaDto } from './dto/create-danhgia.dto';
import { UpdateDanhgiaDto } from './dto/update-danhgia.dto';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

@Controller('danhgias')
export class DanhgiasController {
  constructor(private readonly danhgiasService: DanhgiasService) {}

  @Post()
  create(@Body() createDanhgiaDto: CreateDanhgiaDto) {
    return this.danhgiasService.create(createDanhgiaDto);
  }

  @Get('danhgia-cuahang')
  calcDanhGiaCuaHang() {
    return this.danhgiasService.calcDanhGiaCuaHang();
  }

  @Get('sanpham/:id')
  calcDanhGiaSanPham(@Param('id') id: number) {
    return this.danhgiasService.calcDanhGiaSanPham(id);
  }

  @Get()
  findAll() {
    return this.danhgiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danhgiasService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDanhgiaDto: UpdateDanhgiaDto) {
    return this.danhgiasService.update(+id, updateDanhgiaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.danhgiasService.remove(+id);
  }
}
