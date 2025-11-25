import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { KhuyenmaisService } from './khuyenmais.service';
import { CreateKhuyenmaiDto } from './dto/create-khuyenmai.dto';
import { UpdateKhuyenmaiDto } from './dto/update-khuyenmai.dto';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

@Controller('khuyenmais')
export class KhuyenmaisController {
  constructor(private readonly khuyenmaisService: KhuyenmaisService) {}

  @Post()
  create(@Body() createKhuyenmaiDto: CreateKhuyenmaiDto) {
    return this.khuyenmaisService.create(createKhuyenmaiDto);
  }

  @Get()
  findKhuyenMai(@Query('page') page: number = 1, @Query('s') search: string) {
    return this.khuyenmaisService.findKhuyenMai(+page, search)
  }

  @Get()
  findAll() {
    return this.khuyenmaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.khuyenmaisService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateKhuyenmaiDto: UpdateKhuyenmaiDto) {
    return this.khuyenmaisService.update(+id, updateKhuyenmaiDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.khuyenmaisService.remove(+id);
  }
}
