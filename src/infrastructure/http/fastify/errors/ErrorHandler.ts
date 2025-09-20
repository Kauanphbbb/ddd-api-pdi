import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { DomainError } from "../../../../shared/errors/DomainError";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof DomainError) {
    return reply.status(400).send({
      error: error.message,
    });
  }

  console.error(error);

  return reply.status(500).send({
    error: "Erro interno do servidor.",
  });
}
