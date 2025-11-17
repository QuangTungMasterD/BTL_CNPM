import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoaisService } from './loais.service';
import { CreateLoaiDto } from './dto/create-loai.dto';
import { UpdateLoaiDto } from './dto/update-loai.dto';

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
  update(@Param('id') id: string, @Body() updateLoaiDto: UpdateLoaiDto) {
    return this.loaisService.update(+id, updateLoaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loaisService.remove(+id);
  }
}
