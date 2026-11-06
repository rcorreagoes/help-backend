import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module.js';

@Module({
  imports: [EmployeesModule],
})
export class AppModule {}
