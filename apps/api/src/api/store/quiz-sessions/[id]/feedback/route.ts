import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { QUIZ_SESSION_MODULE } from "../../../../../modules/quiz-session";

export async function PATCH(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;
  const quizService = req.scope.resolve(QUIZ_SESSION_MODULE);

  const session = await (quizService as any).getByShareId(id);
  if (!session) {
    return res.status(404).json({ message: "Quiz session not found" });
  }

  const { results } = req.body as { results: unknown[] };
  if (!Array.isArray(results)) {
    return res.status(400).json({ message: "results must be an array" });
  }

  await (quizService as any).updateQuizSessions([
    { id: session.id, results },
  ]);

  const updated = await (quizService as any).getByShareId(id);
  res.json({ quiz_session: updated });
}
