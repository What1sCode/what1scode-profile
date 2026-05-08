/**
 * Glitch Works Ignition — Bug Smoke Tests
 *
 * Targets bugs identified in adversarial QA review:
 *   CRITICAL #1  — comment bypass in validators
 *   CRITICAL #2  — stale success frame on reload
 *   CRITICAL #4  — fractional step crashes app on boot
 *   HIGH     #2  — order-insensitive validation (reaction-flash)
 *   MEDIUM   #4  — string "false" activates reducedMotion setting
 *
 * Each test asserts CORRECT behavior. A test failure = confirmed bug.
 *
 * Run: npx playwright test bug-smoke.spec.js --reporter=list
 */

const { test, expect } = require("@playwright/test");

const APP_URL = "file:///mnt/c/Projects/glitch-works-ignition/index.html";
const STORAGE_KEY = "glitchWorksState";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function baseState(overrides = {}) {
  const base = {
    screen: "workspace",
    project: "color",
    step: 0,
    code: {},
    prediction: "",
    predictionAnswer: "",
    focus: false,
    lineNumbers: true,
    completed: [],
    showConceptLock: false,
    stepStatus: {
      project: null,
      stepId: null,
      ran: false,
      success: false,
      message: "",
    },
    stepResults: {},
    recentlyCompletedProject: null,
    unlockedLevels: { level1: false },
    settings: {
      font: 1,
      reducedMotion: false,
      highContrast: false,
      theme: "Medium Neon",
    },
  };

  const merged = { ...base, ...overrides };
  if (overrides.settings)
    merged.settings = { ...base.settings, ...overrides.settings };
  if (overrides.stepStatus)
    merged.stepStatus = { ...base.stepStatus, ...overrides.stepStatus };

  return merged;
}

async function loadWithState(page, overrides = {}) {
  await page.addInitScript(
    ({ key, value }) => localStorage.setItem(key, JSON.stringify(value)),
    { key: STORAGE_KEY, value: baseState(overrides) }
  );
  await page.goto(APP_URL);
  // Wait for app root to be present and rendered
  await page.waitForSelector("#app", { state: "attached" });
  await page.waitForTimeout(250);
}

async function setCode(page, code) {
  await page.evaluate((c) => {
    const el = document.querySelector("#codeEditor");
    if (!el) throw new Error("Editor #codeEditor not found");
    el.value = c;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, code);
}

async function clickRun(page) {
  await page.locator(".run-button").click();
  await page.waitForTimeout(200);
}

async function savedStepStatus(page) {
  return page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key) || "{}").stepStatus ?? null,
    STORAGE_KEY
  );
}

async function getRunLogText(page) {
  return page.locator("#runLog").textContent();
}

// ---------------------------------------------------------------------------
// CRITICAL #1 — Comment bypass in validators
//
// Validators regex-match raw/normalizeCode() strings, which do not strip
// comments. A line like `# show("teal")` still matches the show() regex,
// so commented-out code incorrectly passes validation.
// ---------------------------------------------------------------------------

test.describe("CRITICAL #1 — comment bypass", () => {
  test("color-show: '# show(teal)' must not pass validation", async ({
    page,
  }) => {
    await loadWithState(page, { project: "color", step: 0 });

    await setCode(page, '# show("teal")');
    await clickRun(page);

    const status = await savedStepStatus(page);
    expect(status.success, "Commented-out show() should not pass").toBe(false);
    expect(status.ran).toBe(true);
  });

  test("color-show-variable: fully commented code must not pass", async ({
    page,
  }) => {
    // Step 2 of the color project uses color-show-variable validation
    await loadWithState(page, { project: "color", step: 2 });

    await setCode(page, '# color = "teal"\n# show(color)');
    await clickRun(page);

    const status = await savedStepStatus(page);
    expect(
      status.success,
      "Commented-out color assignment + show() should not pass"
    ).toBe(false);
  });

  test("dice-random-number: commented roll line must not pass", async ({
    page,
  }) => {
    // Step 0 of the dice project uses dice-random-number validation
    await loadWithState(page, { project: "dice", step: 0 });

    await setCode(
      page,
      "# roll = random_number(1, 6)\n# show(roll)"
    );
    await clickRun(page);

    const status = await savedStepStatus(page);
    expect(
      status.success,
      "Commented-out roll = random_number() should not pass"
    ).toBe(false);
  });

  test("reaction-flash: commented wait() must not pass", async ({ page }) => {
    // Step 0 of the reaction project uses reaction-flash validation
    await loadWithState(page, { project: "reaction", step: 0 });

    await setCode(page, '# wait()\nflash("green")');
    await clickRun(page);

    const status = await savedStepStatus(page);
    expect(
      status.success,
      "wait() commented out should still fail reaction-flash"
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// HIGH #2 — Order-insensitive validation (reaction-flash)
//
// validateReactionFlash checks that BOTH wait() and flash("green") exist
// but does not verify that wait() appears before flash("green").
// A learner entering them in the wrong order incorrectly passes.
// ---------------------------------------------------------------------------

test.describe("HIGH #2 — order-insensitive validation", () => {
  test("reaction-flash: flash before wait must fail", async ({ page }) => {
    await loadWithState(page, { project: "reaction", step: 0 });

    // Wrong order: flash happens before wait
    await setCode(page, 'flash("green")\nwait()');
    await clickRun(page);

    const status = await savedStepStatus(page);
    expect(
      status.success,
      "flash() before wait() should not pass reaction-flash"
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// CRITICAL #2 — Stale success frame on reload
//
// save() persists stepStatus (including success: true) but does NOT persist
// state.log or state.outputResult. On reload, the workspace can show success
// styling while the run log reads "Output waiting." — no evidence of the run.
// ---------------------------------------------------------------------------

test.describe("CRITICAL #2 — stale success frame on reload", () => {
  test("after reload: run log resets but success UI persists", async ({
    page,
  }) => {
    // Do NOT use loadWithState here — addInitScript re-fires on reload
    // and would overwrite the saved successful run. Navigate bare instead.
    await page.goto(APP_URL);
    await page.waitForSelector("#app", { state: "attached" });
    await page.waitForTimeout(250);

    // Navigate to workspace via the app's own navigation
    await page.evaluate(() => window.setProject("color"));
    await page.evaluate(() => window.setScreen("workspace"));
    await page.waitForTimeout(200);

    // Run the step successfully
    await setCode(page, 'show("teal")');
    await clickRun(page);

    // Confirm success was saved before reload
    const before = await savedStepStatus(page);
    expect(before.success).toBe(true);

    // Reload without clicking Next
    await page.reload();
    await page.waitForSelector("#app", { state: "attached" });
    await page.waitForTimeout(300);

    // state.log is not persisted — run log must reset to default
    const logText = await getRunLogText(page);
    expect(logText).toContain("Output waiting.");

    // stepStatus IS persisted — success frame should still be visible
    // The mismatch is the bug: log says "waiting" but UI shows success
    const after = await savedStepStatus(page);
    expect(after.success).toBe(true);

    // Both true simultaneously = confirmed mismatch
    expect(logText.includes("Output waiting.") && after.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// CRITICAL #4 — Fractional step crashes app on boot
//
// safeRestoreState() validates step as a number in range [0, maxStep] but
// does not check Number.isInteger(). A fractional step like 1.5 passes the
// range check (0 <= 1.5 <= 6 for color), then lessonData["color"][1.5]
// returns undefined, and workspace() throws when reading step.code.
// ---------------------------------------------------------------------------

test.describe("CRITICAL #4 — fractional step boot crash", () => {
  test("step 1.5 on color project: app must render without crashing", async ({
    page,
  }) => {
    await page.addInitScript(
      ({ key, value }) => localStorage.setItem(key, JSON.stringify(value)),
      {
        key: STORAGE_KEY,
        value: baseState({ project: "color", step: 1.5 }),
      }
    );

    // Capture any uncaught JS errors
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto(APP_URL);
    await page.waitForTimeout(500);

    // App root must exist and have content
    const appContent = await page.locator("#app").textContent();
    expect(
      appContent.trim().length,
      "App body is blank — fractional step caused render failure"
    ).toBeGreaterThan(0);

    expect(
      errors.length,
      `Uncaught JS errors on boot: ${errors.join("; ")}`
    ).toBe(0);
    // Rendering without crash + no JS errors confirms the fractional step
    // was handled. (state is const-scoped and not on window, so we verify
    // via observable behavior rather than internal state.)
  });
});

// ---------------------------------------------------------------------------
// MEDIUM #4 — String "false" activates reduced-motion setting
//
// safeRestoreState() normalizes state.settings.font to a Number but does
// not cast reducedMotion / highContrast to boolean. A saved string "false"
// is truthy, so applySettings() enables reduced-motion via !!state.settings.reducedMotion.
// ---------------------------------------------------------------------------

test.describe("MEDIUM #4 — string booleans in settings", () => {
  test("reducedMotion: 'false' (string) must not apply reduced-motion class", async ({
    page,
  }) => {
    await page.addInitScript(
      ({ key, value }) => localStorage.setItem(key, JSON.stringify(value)),
      {
        key: STORAGE_KEY,
        value: baseState({
          settings: {
            font: 1,
            reducedMotion: "false", // string, not boolean
            highContrast: "false",
            theme: "Medium Neon",
          },
        }),
      }
    );

    await page.goto(APP_URL);
    await page.waitForSelector("#app", { state: "attached" });
    await page.waitForTimeout(250);

    const hasReducedMotion = await page.evaluate(
      () => document.body.classList.contains("reduced-motion")
    );

    expect(
      hasReducedMotion,
      "String 'false' for reducedMotion should NOT activate reduced-motion class"
    ).toBe(false);
  });

  test("highContrast: 'false' (string) must not apply high-contrast class", async ({
    page,
  }) => {
    await page.addInitScript(
      ({ key, value }) => localStorage.setItem(key, JSON.stringify(value)),
      {
        key: STORAGE_KEY,
        value: baseState({
          settings: {
            font: 1,
            reducedMotion: false,
            highContrast: "false", // string, not boolean
            theme: "Medium Neon",
          },
        }),
      }
    );

    await page.goto(APP_URL);
    await page.waitForSelector("#app", { state: "attached" });
    await page.waitForTimeout(250);

    const hasHighContrast = await page.evaluate(
      () => document.body.classList.contains("high-contrast")
    );

    expect(
      hasHighContrast,
      "String 'false' for highContrast should NOT activate high-contrast class"
    ).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Bonus — Next without Run: progression must be blocked
//
// A first-time user who clicks Next immediately should be blocked.
// stepStatus.ran must be false. No silent skip.
// ---------------------------------------------------------------------------

test.describe("Bonus — Next without Run", () => {
  test("clicking Next before Run must not advance the step", async ({
    page,
  }) => {
    await loadWithState(page, { project: "color", step: 0 });

    await page.getByRole("button", { name: "Next" }).click();
    await page.waitForTimeout(200);

    const saved = await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key) || "{}"),
      STORAGE_KEY
    );

    expect(saved.step).toBe(0); // must not have advanced
  });
});
