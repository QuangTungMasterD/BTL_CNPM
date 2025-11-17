import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaikhoansService } from './taikhoans.service';
import { CreateTaikhoanDto } from './dto/create-taikhoan.dto';
import { UpdateTaikhoanDto } from './dto/update-taikhoan.dto';

@Controller('taikhoans')
export class TaikhoansController {
  constructor(private readonly taikhoansService: TaikhoansService) {}

  @Post()
  create(@Body() createTaikhoanDto: CreateTaikhoanDto) {
    return this.taikhoansService.create(createTaikhoanDto);
  }

  @Get()
  findAll() {
    return this.taikhoansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taikhoansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaikhoanDto: UpdateTaikhoanDto) {
    return this.taikhoansService.update(+id, updateTaikhoanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taikhoansService.remove(+id);
  }
}
