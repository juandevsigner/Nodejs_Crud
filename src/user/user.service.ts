class UserService {
  constructor() {}

  public async getAllUsers() {
    const users = [
      { id: 1, fullname: "juan", email: "juan@gmail.com" },
      { id: 1, fullname: "emma", email: "emma@gmail.com" },
      { id: 1, fullname: "maria", email: "maria@gmail.com" },
      { id: 1, fullname: "yeka", email: "yeka@gmail.com" },
    ];

    return users;
  }

  public async getUserByID(id: string | number) {
    const user = { id, fullname: "juan", email: "juan@gmail.com" };
    return user;
  }

  public async createUser(userBody: any) {
    const newUser = { ...userBody, id: "321351351" };
    return newUser;
  }

  public async updateUserByID(id: string | number, userBody: any) {
    const updatedUser = { id, ...userBody };
    return updatedUser;
  }
  public async deleteUserByID(id: string | number) {
    const user = { id, fullname: "juan", email: "juan@gmail.com" };
    return user;
  }
}

export default UserService;
