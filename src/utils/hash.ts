import bcrypt from 'bcrypt';

export const createHasValue = async (value: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hashSync(value, salt);
};

export const compareHash = async (psw: string, encryptedPsw: string) => {
  return await bcrypt.compareSync(psw, encryptedPsw);
};
