import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ThongsokythuatsService } from './thongsokythuats.service';
import { CreateThongsokythuatDto } from './dto/create-thongsokythuat.dto';
import { UpdateThongsokythuatDto } from './dto/update-thongsokythuat.dto';
import { JwtAuthGuard } from 'src/Guard/jwt-auth.guard';

@Controller('thongsokythuats')
export class ThongsokythuatsController {
  constructor(private readonly thongsokythuatsService: ThongsokythuatsService) {}

  @Post()
  create(@Body() createThongsokythuatDto: CreateThongsokythuatDto) {
    return this.thongsokythuatsService.create(createThongsokythuatDto);
  }

  @Get()
  findAll() {
    return this.thongsokythuatsService.findAll();
  }

  @Post(':id')
  createBySanPham(@Param('id') id: string, @Body() thongsokythuats: CreateThongsokythuatDto[]) {
    return this.thongsokythuatsService.createBySanPham(+id, thongsokythuats)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thongsokythuatsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateThongsokythuatDto: UpdateThongsokythuatDto) {
    return this.thongsokythuatsService.update(+id, updateThongsokythuatDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.thongsokythuatsService.remove(+id);
  }
}
