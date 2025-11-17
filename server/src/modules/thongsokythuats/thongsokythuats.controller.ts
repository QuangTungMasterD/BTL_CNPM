import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThongsokythuatsService } from './thongsokythuats.service';
import { CreateThongsokythuatDto } from './dto/create-thongsokythuat.dto';
import { UpdateThongsokythuatDto } from './dto/update-thongsokythuat.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thongsokythuatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThongsokythuatDto: UpdateThongsokythuatDto) {
    return this.thongsokythuatsService.update(+id, updateThongsokythuatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thongsokythuatsService.remove(+id);
  }
}
