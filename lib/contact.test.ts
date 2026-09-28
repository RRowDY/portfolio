import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  contactEmailHtml,
  contactFieldErrors,
  createRateLimiter,
  escapeHtml,
  isHoneypotFilled,
} from "./contact.ts";

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "Hello there friend",
};
describe("contactFieldErrors", () => {
  it("accepts spaced, accented, and punctuated names", () => {
    for (const name of ["Jane Doe", "José", "O'Brien", "Mary-Jane"]) {
      const errors = contactFieldErrors({ ...valid, name });
      assert.equal(errors.name, undefined);
    }
  });
  it("rejects numbers and an empty name", () => {
    assert.equal(
      contactFieldErrors({ ...valid, name: "John3" }).name,
      "Use letters, spaces, hyphens, or apostrophes",
    );
    assert.equal(
      contactFieldErrors({ ...valid, name: "" }).name,
      "Name is required",
    );
  });
  it("names each missing field", () => {
    const errors = contactFieldErrors({ name: "", email: "", message: "" });
    assert.equal(errors.name, "Name is required");
    assert.equal(errors.email, "Email is required");
    assert.equal(errors.message, "Message is required");
  });
});
describe("contactEmailHtml", () => {
  it("escapes tags and turns newlines into breaks", () => {
    const html = contactEmailHtml(
      "Ada",
      "ada@example.com",
      "<script>\nalert(1)",
    );
    assert.equal(html.includes("<script>"), false);
    assert.equal(html.includes("&lt;script&gt;"), true);
    assert.equal(html.includes("<br>"), true);
  });
});
describe("escapeHtml", () => {
  it("escapes the five HTML characters", () => {
    assert.equal(escapeHtml(`&<>"'`), "&amp;&lt;&gt;&quot;&#39;");
  });
});
describe("isHoneypotFilled", () => {
  it("treats only non-empty strings as filled", () => {
    assert.equal(isHoneypotFilled("acme"), true);
    assert.equal(isHoneypotFilled("   "), false);
    assert.equal(isHoneypotFilled(undefined), false);
  });
});
describe("createRateLimiter", () => {
  it("allows the limit, then blocks until the window passes", () => {
    const isOverLimit = createRateLimiter(5, 10 * 60 * 1000);
    const start = 1_000_000;
    for (let i = 0; i < 5; i += 1) {
      assert.equal(isOverLimit("visitor", start), false);
    }
    assert.equal(isOverLimit("visitor", start), true);
    assert.equal(isOverLimit("visitor", start + 10 * 60 * 1000), false);
  });
});
