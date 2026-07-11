import { test } from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter } from "../src/middlewares/rateLimiter.js";

const realNow = Date.now;
const setNow = (t) => (Date.now = () => t);

function invoke(mw, id = "u1", ip = "1.1.1.1") {
  const req = { user: { _id: { toString: () => id } }, ip };
  const res = { headers: {}, set(k, v) { this.headers[k] = v; } };
  let error = null;
  mw(req, res, (e) => { error = e ?? null; });
  return { error, res };
}

test("allows up to maxRequests within the window", (t) => {
  t.after(() => (Date.now = realNow));
  const mw = createRateLimiter({ windowMs: 1000, maxRequests: 3 });
  setNow(0); assert.equal(invoke(mw).error, null);
  setNow(100); assert.equal(invoke(mw).error, null);
  setNow(200); assert.equal(invoke(mw).error, null);
});

test("blocks the request that exceeds the limit with 429", (t) => {
  t.after(() => (Date.now = realNow));
  const mw = createRateLimiter({ windowMs: 1000, maxRequests: 3 });
  setNow(0); invoke(mw);
  setNow(100); invoke(mw);
  setNow(200); invoke(mw);
  setNow(300);
  const { error, res } = invoke(mw);
  assert.ok(error, "expected an error");
  assert.equal(error.statusCode, 429);
  assert.equal(res.headers["X-RateLimit-Remaining"], "0");
  assert.equal(res.headers["Retry-After"], "1"); 
});

test("window slides: old hits expire and free capacity", (t) => {
  t.after(() => (Date.now = realNow));
  const mw = createRateLimiter({ windowMs: 1000, maxRequests: 2 });
  setNow(0); invoke(mw);
  setNow(500); invoke(mw);
  setNow(900); assert.ok(invoke(mw).error, "should be blocked at 900");
  setNow(1100); assert.equal(invoke(mw).error, null);
});

test("blocked requests are not recorded (no lock-out inflation)", (t) => {
  t.after(() => (Date.now = realNow));
  const mw = createRateLimiter({ windowMs: 1000, maxRequests: 1 });
  setNow(0); invoke(mw);
  setNow(100); assert.ok(invoke(mw).error); 
  setNow(1000); assert.equal(invoke(mw).error, null);
});

test("different users have independent limits", (t) => {
  t.after(() => (Date.now = realNow));
  const mw = createRateLimiter({ windowMs: 1000, maxRequests: 1 });
  setNow(0);
  assert.equal(invoke(mw, "alice").error, null);
  assert.equal(invoke(mw, "bob").error, null);
  assert.ok(invoke(mw, "alice").error);
});

test("exposes remaining-quota headers on allowed requests", (t) => {
  t.after(() => (Date.now = realNow));
  const mw = createRateLimiter({ windowMs: 1000, maxRequests: 3 });
  setNow(0);
  const { res } = invoke(mw);
  assert.equal(res.headers["X-RateLimit-Limit"], "3");
  assert.equal(res.headers["X-RateLimit-Remaining"], "2");
});

test("falls back to IP when there is no authenticated user", (t) => {
  t.after(() => (Date.now = realNow));
  const mw = createRateLimiter({ windowMs: 1000, maxRequests: 1 });
  const call = (ip) => {
    const req = { ip };
    const res = { set() {} };
    let error = null;
    mw(req, res, (e) => { error = e ?? null; });
    return error;
  };
  setNow(0);
  assert.equal(call("9.9.9.9"), null);
  assert.ok(call("9.9.9.9")); 
  assert.equal(call("8.8.8.8"), null);
});

test("custom keyGenerator overrides the default key", (t) => {
  t.after(() => (Date.now = realNow));
  const mw = createRateLimiter({
    windowMs: 1000,
    maxRequests: 1,
    keyGenerator: () => "global",
  });
  setNow(0);
  assert.equal(invoke(mw, "alice").error, null);
  assert.ok(invoke(mw, "bob").error, "shared key means bob is also limited");
});
