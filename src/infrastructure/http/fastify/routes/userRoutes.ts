import { type FastifyInstance } from "fastify";
import { CreateUserUseCase } from "../../../../application/user/use-cases/CreateUserUseCase";
import { UserRepositoryInMemory } from "../../../database/UserRepositoryInMemory";
import { CreateUserController } from "../controllers/users/CreateUserController";

const userRepo = new UserRepositoryInMemory();

const createUserUseCase = new CreateUserUseCase(userRepo);

const createUserController = new CreateUserController(createUserUseCase);

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUserController.handle);
}
