import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HangsService } from './hangs.service';
import { CreateHangDto } from './dto/create-hang.dto';
import { UpdateHangDto } from './dto/update-hang.dto';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateHangDto: UpdateHangDto) {
    return this.hangsService.update(+id, updateHangDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.hangsService.remove(+id);
  }
}
