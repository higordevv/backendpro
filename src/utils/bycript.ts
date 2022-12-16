import bycript from 'bcrypt'

export  async function Hash (password: string) {
  const sault = 8
  return bycript.hash(password, sault)
}
export  async function VerifyHash (password: string, hash: string): Promise<boolean> {
  return bycript.compareSync(password, hash)
}