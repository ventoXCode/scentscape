import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { QUIZ_SESSION_MODULE } from "../../../../modules/quiz-session";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const quizService = req.scope.resolve(QUIZ_SESSION_MODULE);

  // Require authentication for /me endpoint
  const authContext = (req as any).auth_context;
  if (!authContext?.actor_id) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const customerId = authContext.actor_id;
  const sessions = await (quizService as any).listByCustomerId(customerId);

  res.json({ quiz_sessions: sessions });
}
