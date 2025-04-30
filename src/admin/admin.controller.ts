import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('Admin')
export class AdminController {
  constructor(private readonly AdminService: AdminService) {}
}
