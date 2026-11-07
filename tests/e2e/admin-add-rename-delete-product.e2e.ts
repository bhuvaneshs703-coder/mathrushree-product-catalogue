// Generated from tests/e2e/specs/admin-add-rename-delete-product.json (spec 19a3b89c675f42a0). Edit the spec, not this file.
import { test } from "@e2e-dev/web";
import type { Locator, Screen } from "e2e";
import { expect } from "e2e";

/** Steps this flow's recording found already done; strict replay skips them, as they have nothing to replay. */
const skippedSteps: readonly number[] = JSON.parse(process.env.CAFFEINE_E2E_SKIP_STEPS ?? "[]");

const recording = process.env.CAFFEINE_E2E_MODE === "record" || process.env.CAFFEINE_E2E_MODE === "heal";

/** Whether `holds` turns true within the assertion timeout. */
async function eventually(holds: () => Promise<boolean>): Promise<boolean> {
  const deadline = Date.now() + 5000;
  for (;;) {
    if (await holds()) return true;
    if (Date.now() >= deadline) return false;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
}

function flowChecks() {
  let failed = 0;
  return {
    /** Spec check `index`: a failure fails a strict replay at once and is kept otherwise. */
    async check(index: number, verify: () => Promise<void>, holds: () => Promise<boolean>): Promise<void> {
      if (!recording) return verify();
      if (failed === 0) {
        try {
          return await verify();
        } catch (error) {
          if ((error as { code?: unknown }).code !== "ASSERTION_FAILED") throw error;
        }
      } else if (await eventually(holds)) {
        return;
      }
      failed += 1;
      expect.soft(false, `check ${String(index)}`).toBe(true);
    },
  };
}

/** `text` as a case-insensitive pattern in which each run of spaces also matches none. */
function spacedText(text: string): RegExp {
  const words = text.trim().split(/\s+/).map((word) => word.replace(/[.*+?^$(){}|[\]\\]/g, "\\$&"));
  return new RegExp(words.join("\\s*"), "i");
}

/** Words the screen shows: visible text, the placeholder of an input that shows it, or a field that holds it right after the step that typed it. */
async function shownText(screen: Screen, text: string, typed = false): Promise<Locator> {
  const asText = screen.getByText(spacedText(text), { visible: true }).first();
  const asPlaceholder = screen.getByPlaceholder(text, { exact: false, visible: true }).first();
  const asValue = screen.getByDisplayValue(text, { exact: false, visible: true }).first();
  for (let waited = 0; waited < 5000; waited += 250) {
    if (await asText.isVisible()) return asText;
    if (await asPlaceholder.isVisible()) return asPlaceholder;
    if (typed && (await asValue.isVisible())) return asValue;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return asText;
}

test("admin-add-rename-delete-product", async ({ app, agent, screen }) => {
  const flow = flowChecks();
  await app.open("/");

  if (!skippedSteps.includes(0)) await agent.act("Sign in\nDo not do the next step yet: Press the Admin link");
  await flow.check(0, async () => { await expect(await shownText(screen, "Admin")).toBeVisible({ timeout: 15000 }); }, async () => (await shownText(screen, "Admin")).isVisible());

  if (!skippedSteps.includes(1)) await agent.act("Press the Admin link\nDo not do the next step yet: Add a product named Ivory Silk Saree with SKU TEST-001, create a category named Sarees from the editor, and press Create product", { maxModelCalls: 20 });
  await flow.check(1, async () => { await expect(await shownText(screen, "Products")).toBeVisible(); }, async () => (await shownText(screen, "Products")).isVisible());

  if (!skippedSteps.includes(2)) await agent.act("Add a product named Ivory Silk Saree with SKU TEST-001, create a category named Sarees from the editor, and press Create product\nDo not do the next step yet: Press Rename on Ivory Silk Saree", { maxModelCalls: 20 });
  await flow.check(2, async () => { await expect(await shownText(screen, "Ivory Silk Saree", true)).toBeVisible(); }, async () => (await shownText(screen, "Ivory Silk Saree", true)).isVisible());
  await flow.check(3, async () => { await expect(await shownText(screen, "TEST-001", true)).toBeVisible(); }, async () => (await shownText(screen, "TEST-001", true)).isVisible());

  if (!skippedSteps.includes(3)) await agent.act("Press Rename on Ivory Silk Saree\nDo not do the next step yet: Rename the product to Ivory Silk Saree Deluxe and press Save", { maxModelCalls: 20 });
  await flow.check(4, async () => { await expect(await shownText(screen, "Ivory Silk Saree", true)).toBeVisible(); }, async () => (await shownText(screen, "Ivory Silk Saree", true)).isVisible());

  if (!skippedSteps.includes(4)) await agent.act("Rename the product to Ivory Silk Saree Deluxe and press Save\nDo not do the next step yet: Press Delete on Ivory Silk Saree Deluxe and confirm", { maxModelCalls: 20 });
  await flow.check(5, async () => { await expect(await shownText(screen, "Ivory Silk Saree Deluxe", true)).toBeVisible(); }, async () => (await shownText(screen, "Ivory Silk Saree Deluxe", true)).isVisible());

  if (!skippedSteps.includes(5)) await agent.act("Press Delete on Ivory Silk Saree Deluxe and confirm", { maxModelCalls: 20 });
  await flow.check(6, async () => { await expect(screen.getByText(spacedText("Ivory Silk Saree Deluxe"), { exact: false, visible: true })).toHaveCount(0); }, async () => (await screen.getByText(spacedText("Ivory Silk Saree Deluxe"), { exact: false, visible: true }).count()) === 0);
});
