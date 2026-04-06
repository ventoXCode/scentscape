import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function createApiKey({ container }: ExecArgs) {
  const apiKeyService = container.resolve(Modules.API_KEY);
  const salesChannelService = container.resolve(Modules.SALES_CHANNEL);

  // List existing keys
  const existingKeys = await apiKeyService.listApiKeys({ type: "publishable" });
  if (existingKeys.length > 0) {
    console.log("Publishable API key already exists:", existingKeys[0].token);
    return;
  }

  // Get or create default sales channel
  let channels = await salesChannelService.listSalesChannels({});
  let channel = channels[0];
  if (!channel) {
    channel = await salesChannelService.createSalesChannels({
      name: "Default Sales Channel",
      is_disabled: false,
    });
    console.log("Created sales channel:", channel.id);
  }

  // Create publishable API key
  const key = await apiKeyService.createApiKeys({
    title: "Development Storefront",
    type: "publishable",
    created_by: "admin",
  });

  // Link key to sales channel
  const linkService = container.resolve("remoteLink");
  await linkService.create({
    [Modules.API_KEY]: { api_key_id: key.id },
    [Modules.SALES_CHANNEL]: { sales_channel_id: channel.id },
  });

  console.log("Publishable API Key:", key.token);
  console.log("Linked to sales channel:", channel.name);
}
