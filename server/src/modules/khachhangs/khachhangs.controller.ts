import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { KhachhangsService } from './khachhangs.service';
import { UpdateKhachhangDto } from './dto/update-khachhang.dto';
import { CreateKhachhangDtoHasTK } from './dto/create.dto';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

@Controller('khachhangs')
export class KhachhangsController {
  constructor(private readonly khachhangsService: KhachhangsService) {}

  @Post()
  create(@Body() createKhachhangDto: CreateKhachhangDtoHasTK) {
    return this.khachhangsService.create(createKhachhangDto);
  }

  @Get('total')
  findTotalKhachHang() {
    return this.khachhangsService.findTotalKhachHang();
  }

  @Get()
  findKhachHang(@Query('page') page: number = 1, @Query('s') search: string) {
    return this.khachhangsService.findKhachHang(page, search);
  }

  @Get()
  findAll() {
    return this.khachhangsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.khachhangsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateKhachhangDto: UpdateKhachhangDto) {
    return this.khachhangsService.update(+id, updateKhachhangDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.khachhangsService.remove(+id);
  }
}
