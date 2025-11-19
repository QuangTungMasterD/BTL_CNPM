import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { HoadonsService } from './hoadons.service';
import { CreateHoadonDto } from './dto/create-hoadon.dto';
import { UpdateHoadonDto } from './dto/update-hoadon.dto';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

@Controller('hoadons')
export class HoadonsController {
  constructor(private readonly hoadonsService: HoadonsService) {}

  @Post()
  create(@Body() createHoadonDto: CreateHoadonDto) {
    return this.hoadonsService.create(createHoadonDto);
  }

  @Get()
  findHoaDonByMonth(@Query('month') month: number = 1, @Query('page') page: number = 1) {
    return this.hoadonsService.findHoaDonByMonth(month, page);
  }

  @Get()
  findAll() {
    return this.hoadonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hoadonsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateHoadonDto: UpdateHoadonDto) {
    return this.hoadonsService.update(+id, updateHoadonDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.hoadonsService.remove(+id);
  }
}
