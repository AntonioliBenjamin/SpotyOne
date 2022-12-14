import { CreateUser } from "../../Usecases/user/CreateUser";
import { User } from "../../Entities/User";
import { InMemoryUserRepository } from "../adapters/repositories/InMemoryUserRepository";
import { UuidGateway } from "../adapters/gateways/UuidGateway";
import { BcryptGateway } from "../adapters/gateways/BcryptGateway";
import { UserErrors } from "../../errors/UserErrors";

const dbCreateUser = new Map<string, User>();

describe("When I call CreateUser ====>", () => {
  let createUser: CreateUser;

  beforeAll(() => {
    const inMemoryUserRepository = new InMemoryUserRepository(dbCreateUser);
    const uuidGateway = new UuidGateway();
    const bcryptGateway = new BcryptGateway();
    createUser = new CreateUser(
      inMemoryUserRepository,
      uuidGateway,
      bcryptGateway
    );
  });
  
  it("should throw if user already exists", async () => {
    await createUser.execute({
      userName: "JOJO",
      email: "jojo@gmail.com",
      password: "1234",
    });
    const result = () =>
      createUser.execute({
        userName: "JOJO",
        email: "jojo@gmail.com",
        password: "1234",
      });
    await expect(() => result()).rejects.toThrow(UserErrors.AlreadyExist);
  });
  it("should create user", async () => {
    const result = await createUser.execute({
      userName: "michel",
      email: "michel@gmail.com",
      password: "1234",
    });
    expect(result.props.id).toBeTruthy();
    expect(result.props.userName).toEqual("michel");
  });

 
});