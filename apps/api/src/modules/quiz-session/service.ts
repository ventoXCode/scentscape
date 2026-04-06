import { MedusaService } from "@medusajs/framework/utils";
import { QuizSession } from "./models/quiz-session";

export class QuizSessionModuleService extends MedusaService({
  QuizSession,
}) {
  async getByShareId(shareId: string) {
    const sessions = await (this as any).listQuizSessions({
      share_id: shareId,
    });
    return sessions[0] ?? null;
  }

  async listByCustomerId(customerId: string) {
    return (this as any).listQuizSessions(
      { customer_id: customerId },
      { order: { created_at: "DESC" } }
    );
  }

  async getLatestByCustomerId(customerId: string) {
    const sessions = await (this as any).listQuizSessions(
      { customer_id: customerId },
      { order: { created_at: "DESC" }, take: 1 }
    );
    return sessions[0] ?? null;
  }
}
