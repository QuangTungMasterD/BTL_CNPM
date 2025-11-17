import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KhuyenmaisService } from './khuyenmais.service';
import { CreateKhuyenmaiDto } from './dto/create-khuyenmai.dto';
import { UpdateKhuyenmaiDto } from './dto/update-khuyenmai.dto';

@Controller('khuyenmais')
export class KhuyenmaisController {
  constructor(private readonly khuyenmaisService: KhuyenmaisService) {}

  @Post()
  create(@Body() createKhuyenmaiDto: CreateKhuyenmaiDto) {
    return this.khuyenmaisService.create(createKhuyenmaiDto);
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
  update(@Param('id') id: string, @Body() updateKhuyenmaiDto: UpdateKhuyenmaiDto) {
    return this.khuyenmaisService.update(+id, updateKhuyenmaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.khuyenmaisService.remove(+id);
  }
}
