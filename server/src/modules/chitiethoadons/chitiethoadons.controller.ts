import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChitiethoadonsService } from './chitiethoadons.service';
import { CreateChitiethoadonDto } from './dto/create-chitiethoadon.dto';
import { UpdateChitiethoadonDto } from './dto/update-chitiethoadon.dto';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

@Controller('chitiethoadons')
export class ChitiethoadonsController {
  constructor(private readonly chitiethoadonsService: ChitiethoadonsService) {}

  @Post()
  create(@Body() createChitiethoadonDto: CreateChitiethoadonDto) {
    return this.chitiethoadonsService.create(createChitiethoadonDto);
  }

  @Get()
  findAll() {
    return this.chitiethoadonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chitiethoadonsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateChitiethoadonDto: UpdateChitiethoadonDto) {
    return this.chitiethoadonsService.update(+id, updateChitiethoadonDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.chitiethoadonsService.remove(+id);
  }
}
