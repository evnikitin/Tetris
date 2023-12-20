import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserTimeRecordDto } from './dto/user-time-record.dto';
import { UserPointsRecordDto } from './dto/user-points-record.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('time-records')
  @ApiOperation({ summary: 'Get 5 best time record users' })
  @ApiResponse({
    status: 200,
    type: [UserTimeRecordDto],
    description: 'Here are all users records',
  })
  getTimeRecords(): Promise<UserTimeRecordDto[]> {
    return this.userService.getTimeRecords();
  }

  @Get('points-records')
  @ApiOperation({ summary: 'Get 5 best points record users' })
  @ApiResponse({
    status: 200,
    type: [UserPointsRecordDto],
    description: 'Here are all users records',
  })
  getPointsRecords(): Promise<UserPointsRecordDto[]> {
    return this.userService.getPointsRecords();
  }
}
