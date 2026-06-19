import { Optional } from '@nestjs/common';
// import { ApiProperty } from '@nestjs/swagger';


export class User {
  // @ApiProperty({ description: 'Phone number except +7', nullable: false })
  username: string;
  // @ApiProperty({ description: 'hash', nullable: false })
  password: string;
}

export class VeryifyCode {
  // @ApiProperty({ description: 'code 4 numbers', nullable: false })
  code: string;
}

export class GetUserDto {
  id: string;
  phone?: string;
  name: string;

}


