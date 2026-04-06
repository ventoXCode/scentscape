import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import crypto from "crypto";
import { QUIZ_SESSION_MODULE } from "../../../modules/quiz-session";

function generateShareId(): string {
  // 8-char URL-safe base64 string (~48 bits of entropy)
  return crypto.randomBytes(6).toString("base64url");
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const quizService = req.scope.resolve(QUIZ_SESSION_MODULE);

  const {
    answers,
    dimensions,
    family_affinities,
    accord_affinities,
    intensity,
    occasions,
    experience,
    archetype_id,
    results,
  } = req.body as Record<string, unknown>;

  if (!archetype_id || !answers || !dimensions || !results) {
    return res.status(400).json({
      message: "Missing required fields: answers, dimensions, archetype_id, results",
    });
  }

  // Extract customer ID from auth if available
  let customerId: string | null = null;
  try {
    const authIdentity = (req as any).auth_context?.auth_identity_id;
    if (authIdentity) {
      const customerService = req.scope.resolve("customerModuleService");
      const [customers] = await (customerService as any).listAndCountCustomers({});
      // Find customer linked to this auth identity — simplified lookup
      customerId = customers?.[0]?.id ?? null;
    }
  } catch {
    // Anonymous session — no customer linked
  }

  const shareId = generateShareId();

  const [session] = await (quizService as any).createQuizSessions([
    {
      share_id: shareId,
      customer_id: customerId,
      answers,
      dimensions,
      family_affinities: family_affinities ?? {},
      accord_affinities: accord_affinities ?? {},
      intensity: intensity ?? null,
      occasions: occasions ?? [],
      experience: experience ?? null,
      archetype_id,
      results,
    },
  ]);

  res.status(201).json({ quiz_session: session });
}
