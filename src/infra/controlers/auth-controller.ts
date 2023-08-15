import { Body, Controller, Post, Inject } from '@nestjs/common';
import { authDto } from '../dto';
import { infra } from '../common';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(infra.environment.keycloakBaseUrl)
    private readonly keycloakBaseUrl: string,
    @Inject(infra.environment.keycloakClient)
    private readonly keycloakClient: string,
    @Inject(infra.environment.keycloakClientSecret)
    private readonly keycloakClientSecret: string,
  ) {}

  @Post()
  async login(@Body() body: any) {
    const { username, password } = authDto.parse(body);

    const res = await fetch(
      this.keycloakBaseUrl + '/protocol/openid-connect/token',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.keycloakClient,
          client_secret: this.keycloakClientSecret,
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
