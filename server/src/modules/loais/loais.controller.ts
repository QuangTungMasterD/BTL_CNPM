import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LoaisService } from './loais.service';
import { CreateLoaiDto } from './dto/create-loai.dto';
import { UpdateLoaiDto } from './dto/update-loai.dto';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

@Controller('loais')
export class LoaisController {
  constructor(private readonly loaisService: LoaisService) {}

  @Post()
  create(@Body() createLoaiDto: CreateLoaiDto) {
    return this.loaisService.create(createLoaiDto);
  }

  @Get()
  findAll() {
    return this.loaisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loaisService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateLoaiDto: UpdateLoaiDto) {
    return this.loaisService.update(+id, updateLoaiDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.loaisService.remove(+id);
  }
}
