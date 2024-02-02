export interface IUsersModel<IUsers> {
  findByEmail(email: string): Promise<IUsers | null>
}
