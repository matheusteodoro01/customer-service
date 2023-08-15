import { Body, Controller, Post } from '@nestjs/common';
import { authDto } from '../dto';

@Controller('auth')
export class AuthController {
  @Post()
  async login(@Body() body: any) {
    const { username, password } = authDto.parse(body);

    const res = await fetch(
      'http://localhost:8080/realms/fapp/protocol/openid-connect/token',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: 'customer',
          client_secret: 'w4RAEHrCSzJIslBPBuJZVnUXdRyzZ1MS',
          grant_type: 'password',
          username,
          password,
        }),
        method: 'POST',
      },
    );
    return await res.json();
  }
}
