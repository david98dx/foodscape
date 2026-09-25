import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

class CreateFoodDto {
  name: string;
  calories?: number;
}

@ApiTags('foods')
@Controller('api/foods')
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Listar alimentos' })
  @ApiResponse({ status: 200, description: 'Lista de alimentos' })
  getAll() {
    return [{ id: 1, name: 'Ejemplo', calories: 100 }];
  }

  @Post()
  @ApiOperation({ summary: 'Crear alimento' })
  @ApiResponse({ status: 201, description: 'Alimento creado' })
  create(@Body() dto: CreateFoodDto) {
    return { id: 2, ...dto };
  }
}
