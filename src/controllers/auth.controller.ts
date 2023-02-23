import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService, TokenService } from '@service';

import D from '@decorator';

import { LoginDto, RefreshTokenDto } from '@dto/auth';
import { CreateUserDto } from '@dto/user';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @ApiOperation({
    summary: '회원가입',
    description: '새로운 유저를 생성합니다.',
  })
  @Post('register')
  @D.Transactional
  async register(@Body() createUserDto: CreateUserDto) {
    const userIdentifier = await this.authService.register(createUserDto);

    return this.tokenService.generate(userIdentifier);
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  @D.Transactional
  async login(@Body() loginDto: LoginDto) {
    const userIdentifier = await this.authService.validate(loginDto);

    return this.tokenService.generate(userIdentifier);
  }

  @ApiOperation({
    summary: '로그아웃',
  })
  @Post('logout')
  @D.Transactional
  async logout(@Body() { refreshToken }: RefreshTokenDto) {
    return this.tokenService.invalidate(refreshToken);
  }

  @ApiOperation({
    summary: '토큰 재발급',
  })
  @Post('refresh')
  @D.Transactional
  async refresh(@Body() { refreshToken }: RefreshTokenDto) {
    return this.tokenService.refresh(refreshToken);
  }
}
