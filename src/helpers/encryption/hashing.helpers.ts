import * as bcrypt from 'bcrypt';

export const hash = async (text) => {
  return await bcrypt.hash(text, parseInt(process.env.SALT));
};

export const check = async (text, hash) => {
  return await bcrypt.compare(text, hash);
};
