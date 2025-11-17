import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SanphamsService } from './sanphams.service';
import { CreateSanphamDto } from './dto/create-sanpham.dto';
import { UpdateSanphamDto } from './dto/update-sanpham.dto';

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
  findSanPham(@Query('page') page: number = 1) {
    return this.sanphamsService.findSanPham(+page);
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
  update(@Param('id') id: string, @Body() updateSanphamDto: UpdateSanphamDto) {
    return this.sanphamsService.update(+id, updateSanphamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sanphamsService.remove(+id);
  }
}
