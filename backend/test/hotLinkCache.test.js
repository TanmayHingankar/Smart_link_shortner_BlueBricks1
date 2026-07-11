import { test } from "node:test";
import assert from "node:assert/strict";
import { HotLinkCache } from "../src/cache/hotLink.cache.js";

const realNow = Date.now;
const setNow = (t) => (Date.now = () => t);

test("returns a stored value before it expires", (t) => {
  t.after(() => (Date.now = realNow));
  const cache = new HotLinkCache(1000);
  setNow(0);
  cache.set("abc", { longUrl: "x" });
  setNow(500);
  assert.deepEqual(cache.get("abc"), { longUrl: "x" });
});

test("returns null for a missing key", (t) => {
  t.after(() => (Date.now = realNow));
  const cache = new HotLinkCache(1000);
  setNow(0);
  assert.equal(cache.get("nope"), null);
});

test("expires entries after ttl and removes them lazily", (t) => {
  t.after(() => (Date.now = realNow));
  const cache = new HotLinkCache(1000);
  setNow(0);
  cache.set("abc", { longUrl: "x" });
  setNow(1001); 
  assert.equal(cache.get("abc"), null);
  assert.equal(cache.size, 0, "expired entry should be evicted on read");
});

test("set refreshes ttl for an existing key", (t) => {
  t.after(() => (Date.now = realNow));
  const cache = new HotLinkCache(1000);
  setNow(0);
  cache.set("abc", { v: 1 });
  setNow(800);
  cache.set("abc", { v: 2 });
  setNow(1500); 
  assert.deepEqual(cache.get("abc"), { v: 2 });
});

test("delete removes an entry (forces next read from DB)", (t) => {
  t.after(() => (Date.now = realNow));
  const cache = new HotLinkCache(1000);
  setNow(0);
  cache.set("abc", { v: 1 });
  cache.delete("abc");
  assert.equal(cache.get("abc"), null);
});

test("clear empties the cache", (t) => {
  t.after(() => (Date.now = realNow));
  const cache = new HotLinkCache(1000);
  setNow(0);
  cache.set("a", 1);
  cache.set("b", 2);
  cache.clear();
  assert.equal(cache.size, 0);
});
