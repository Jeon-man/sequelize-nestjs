import { Injectable } from '@nestjs/common';

import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { KeyOf } from '@util/types';

import { ConfigService, EnvironmentVariables } from './config.service';

@Injectable()
export class UtilService {
  constructor(private readonly configService: ConfigService) {}

  //util 함수에서 필요한 환경변수 가져오기
  private async getEnvVariable(variables: KeyOf<EnvironmentVariables>[]) {
    return Promise.all(variables.map(_variables => this.configService.get(_variables)));
  }

  async cipher(password: string): Promise<string> {
    const [ENCRYPT_SECRET, SALT] = await this.getEnvVariable(['ENCRYPT_SECRET', 'SALT']);
    const KEY = crypto.scryptSync(ENCRYPT_SECRET, SALT, 32);
    const IV = crypto.scryptSync(ENCRYPT_SECRET, SALT, 16);

    return new Promise((resolve, reject) => {
      const algorithm = 'aes-256-cbc';
      const cipher = crypto.createCipheriv(algorithm, KEY, IV);
      let result = cipher.update(password, 'utf8', 'base64');
      result += cipher.final('base64');
      resolve(result);
    });
  }

  async decipher(password: string): Promise<string> {
    const [ENCRYPT_SECRET, SALT] = await this.getEnvVariable(['ENCRYPT_SECRET', 'SALT']);
    const KEY = crypto.scryptSync(ENCRYPT_SECRET, SALT, 32);
    const IV = crypto.scryptSync(ENCRYPT_SECRET, SALT, 16);

    return new Promise((resolve, reject) => {
      const decode = crypto.createDecipheriv('aes-256-cbc', KEY, IV);
      const decodeResult =
        decode.update(password, 'base64', 'utf8') + // 암호화된 문자열, 암호화 했던 인코딩 종류, 복호화 할 인코딩 종류 설정
        decode.final('utf8'); // 복호화 결과의 인코딩
      resolve(decodeResult);
    });
  }

  async generateHashPassword(password: string) {
    const [SALT] = await this.getEnvVariable(['SALT']);
    const salt = await bcrypt.genSalt(SALT);

    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, comparePassword: string) {
    return bcrypt.compare(password, comparePassword);
  }
}
