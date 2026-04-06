import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { QUIZ_SESSION_MODULE } from "../../../../modules/quiz-session";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;
  const quizService = req.scope.resolve(QUIZ_SESSION_MODULE);

  const session = await (quizService as any).getByShareId(id);

  if (!session) {
    return res.status(404).json({ message: "Quiz session not found" });
  }

  res.json({ quiz_session: session });
}
