import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VaitrosService } from './vaitros.service';
import { CreateVaitroDto } from './dto/create-vaitro.dto';
import { UpdateVaitroDto } from './dto/update-vaitro.dto';

@Controller('vaitros')
export class VaitrosController {
  constructor(private readonly vaitrosService: VaitrosService) {}

  @Post()
  create(@Body() createVaitroDto: CreateVaitroDto) {
    return this.vaitrosService.create(createVaitroDto);
  }

  @Get()
  findAll() {
    return this.vaitrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaitrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVaitroDto: UpdateVaitroDto) {
    return this.vaitrosService.update(+id, updateVaitroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaitrosService.remove(+id);
  }
}
