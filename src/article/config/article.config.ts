import { registerAs } from '@nestjs/config';

export default registerAs('article', () => ({
  foo: 'bar',
}));
