import { Module } from "@medusajs/framework/utils";
import { QuizSessionModuleService } from "./service";

export const QUIZ_SESSION_MODULE = "quizSessionModuleService";

export default Module(QUIZ_SESSION_MODULE, {
  service: QuizSessionModuleService,
});
