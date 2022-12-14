import { ConnectUser } from "../../Usecases/user/ConnectUser";
import { InMemoryUserRepository } from "../adapters/repositories/InMemoryUserRepository";
import { User } from "../../Entities/User";
import { BcryptGateway } from "../adapters/gateways/BcryptGateway";
import { CreateUser } from "../../Usecases/user/CreateUser";
import { UuidGateway } from "../adapters/gateways/UuidGateway";
import { UserErrors } from "../../errors/UserErrors";
const dbConnectUser = new Map<string, User>();

describe("When I call ConnectUser ====>", () => {
  let createUser: CreateUser;
  let connectUser: ConnectUser;
  let bcryptGateway: BcryptGateway;
  beforeAll(() => {
    const inMemoryUserRepository = new InMemoryUserRepository(dbConnectUser);
    const uuidGateway = new UuidGateway();
    bcryptGateway = new BcryptGateway();
    connectUser = new ConnectUser(inMemoryUserRepository, bcryptGateway);
    createUser = new CreateUser(
      inMemoryUserRepository,
      uuidGateway,
      bcryptGateway
    );
  });

  it("should connect user ====>", async () => {
    await createUser.execute({
      userName: "JOJO",
      email: "jojo@gmail.com",
      password: "1234",
    });
    const result = await connectUser.execute({
      email: "jojo@gmail.com",
      password: "1234",
    });
    await expect(result.props.userName).toEqual("jojo");
    await expect(result.props.email).toEqual("jojo@gmail.com");
    await expect(bcryptGateway.decrypt("1234", result.props.password)).toEqual(
      true
    );
  });

  it("should throw if email not found ====>", async () => {
    const result = () =>
      connectUser.execute({
        email: "mimi@gmail.com",
        password: "1234",
      });
    await expect(() => result()).rejects.toThrow(UserErrors.NotFound);
  });

  it("should throw if password doesnt match ====>", async () => {
    await createUser.execute({
      userName: "mich",
      email: "mich@gmail.com",
      password: "1234",
    });
    const result = () =>
      connectUser.execute({
        email: "jojo@gmail.com",
        password: "5678",
      });
    await expect(() => result()).rejects.toThrowError(UserErrors.WrongPassword);
  });
});
