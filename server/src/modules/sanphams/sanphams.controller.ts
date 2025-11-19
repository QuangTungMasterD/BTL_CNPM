import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SanphamsService } from './sanphams.service';
import { CreateSanphamDto } from './dto/create-sanpham.dto';
import { UpdateSanphamDto } from './dto/update-sanpham.dto';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

@Controller('sanphams')
export class SanphamsController {
  constructor(private readonly sanphamsService: SanphamsService) {}

  @Post()
  create(@Body() createSanphamDto: CreateSanphamDto) {
    return this.sanphamsService.create(createSanphamDto);
  }

  @Get('total')
  findTotalSanPham() {
    return this.sanphamsService.findTotalSanPham();
  }

  @Get()
  findSanPham(@Query('page') page: number) {
    if (page) {
      return this.sanphamsService.findSanPham(+page);
    }
    return this.sanphamsService.findAll();
  }

  @Get()
  findAll() {
    return this.sanphamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sanphamsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateSanphamDto: UpdateSanphamDto) {
    return this.sanphamsService.update(+id, updateSanphamDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.sanphamsService.remove(+id);
  }
}
