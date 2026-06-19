import { UserEntity } from './dao/user.entity';
import { GetUserDto } from './dto/users.dto';

export const transformUser = (user: UserEntity): GetUserDto => ({
  id: user.id,

});

interface AuthModel {
  token: string;
}

export interface TokenModel {
  id: string;
  phone?: string;
  name: string;
}
interface UserAuthModel {
  id: string;
  phone: string;
  name: string;
  token: string;
}
