import { Injectable } from '@nestjs/common';
import { CreateThongsokythuatDto } from './dto/create-thongsokythuat.dto';
import { UpdateThongsokythuatDto } from './dto/update-thongsokythuat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Thongsokythuat } from './entities/thongsokythuat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThongsokythuatsService {

  constructor(@InjectRepository(Thongsokythuat) private thongsoRepo: Repository<Thongsokythuat>
  ) {}

  create(createThongsokythuatDto: CreateThongsokythuatDto) {
    return 'This action adds a new thongsokythuat';
  }

  async createBySanPham(id: number, createThongsokythuatDtos: CreateThongsokythuatDto[]) {
    await this.thongsoRepo.delete({ IdSanPham: id });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    createThongsokythuatDtos.forEach(async (item) => {
      const ts = this.thongsoRepo.create({
        IdSanPham: id,
        TenTS: item.TenTS,
        GiaTri: item.GiaTri
      });
      await this.thongsoRepo.save(ts);
    })
    
    return { state: true, notify: "Cập nhật thành công." }
  }

  findAll() {
    return `This action returns all thongsokythuats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thongsokythuat`;
  }

  update(id: number, updateThongsokythuatDto: UpdateThongsokythuatDto) {
    return `This action updates a #${id} thongsokythuat`;
  }

  async remove(id: number) {
    const tskt = await this.thongsoRepo.findOne({ where: { IdThongSo: id } });
    
    let state = false;
    let notify = 'Xóa thông số thất bại';
    if(tskt) {
      const result = await this.thongsoRepo.delete(id);
      state = (result.affected ?? 0) > 0;
      notify = state ? 'Xóa thông số thành công' : 'Xóa thông số thất bại';
    }
    return {
      state, notify
    }
  }
}
