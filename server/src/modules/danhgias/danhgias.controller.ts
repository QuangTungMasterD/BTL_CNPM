import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DanhgiasService } from './danhgias.service';
import { CreateDanhgiaDto } from './dto/create-danhgia.dto';
import { UpdateDanhgiaDto } from './dto/update-danhgia.dto';

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

  @Get()
  findAll() {
    return this.danhgiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danhgiasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDanhgiaDto: UpdateDanhgiaDto) {
    return this.danhgiasService.update(+id, updateDanhgiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danhgiasService.remove(+id);
  }
}
