import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HangsService } from './hangs.service';
import { CreateHangDto } from './dto/create-hang.dto';
import { UpdateHangDto } from './dto/update-hang.dto';

@Controller('hangs')
export class HangsController {
  constructor(private readonly hangsService: HangsService) {}

  @Post()
  create(@Body() createHangDto: CreateHangDto) {
    return this.hangsService.create(createHangDto);
  }

  @Get()
  findAll() {
    return this.hangsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hangsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHangDto: UpdateHangDto) {
    return this.hangsService.update(+id, updateHangDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hangsService.remove(+id);
  }
}
