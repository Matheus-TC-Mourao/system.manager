import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { Establishment } from './entities/establishment.entity';

@Controller('establishment')
export class EstablishmentController {
  constructor(private readonly establishmentService: EstablishmentService) {}

  @Post()
  async create(
    @Body() createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    return await this.establishmentService.create(createEstablishmentDto);
  }

  @Get()
  async findAll(): Promise<Establishment[]> {
    return await this.establishmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Establishment> {
    return await this.establishmentService.findOne(id);
  }

  @Get('type/:type')
  async findByType(@Param('type') id: string): Promise<Establishment[]> {
    return await this.establishmentService.findByType(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    return await this.establishmentService.update(id, updateEstablishmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.establishmentService.remove(id);
  }
}
