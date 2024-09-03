export interface IUserLogin {
  email: string
  password: string
}

export interface IUser {
  id: string
  name: string
  lastname: string
  email: string
  phonenumber: string
  code: string
  dni: string
  role: string
}
export interface IUserSignUp {
  name: string
  lastname: string
  email: string
  phonenumber: string
  code: string
  dni: string
  role: string
  password: string
}