import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NhanviensService } from './nhanviens.service';
import { CreateNhanvienDto } from './dto/create-nhanvien.dto';
import { UpdateNhanvienDto } from './dto/update-nhanvien.dto';

@Controller('nhanviens')
export class NhanviensController {
  constructor(private readonly nhanviensService: NhanviensService) {}

  @Post()
  create(@Body() createNhanvienDto: CreateNhanvienDto) {
    return this.nhanviensService.create(createNhanvienDto);
  }

  @Get('/total')
  findTotalNhanVien() {
    return this.nhanviensService.findTotalNhanVien();
  }

  @Get()
  findAll() {
    return this.nhanviensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nhanviensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNhanvienDto: UpdateNhanvienDto) {
    return this.nhanviensService.update(+id, updateNhanvienDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nhanviensService.remove(+id);
  }
}
