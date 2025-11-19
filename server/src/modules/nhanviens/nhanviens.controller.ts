import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { NhanviensService } from './nhanviens.service';
import { CreateNhanvienDto } from './dto/create-nhanvien.dto';
import { UpdateNhanvienDto } from './dto/update-nhanvien.dto';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

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
  findNhanVien(@Query('page') page: number = 1) {
    return this.nhanviensService.findNhanVien(page);
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
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateNhanvienDto: UpdateNhanvienDto) {
    return this.nhanviensService.update(+id, updateNhanvienDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.nhanviensService.remove(+id);
  }
}
