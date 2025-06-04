// Leastly Recently used



class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Maintains insertion order
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1; // Not found
    }

    const value = this.cache.get(key);
    
    // Move the key to the end to mark it as recently used
    this.cache.delete(key);
    this.cache.set(key, value);
    
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      // Delete it so we can re-insert at the end (most recently used)
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      // Remove the least recently used item
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }
}

const lru = new LRUCache(3);

lru.put('a', 1); // Cache: a
lru.put('b', 2); // Cache: a, b
lru.put('c', 3); // Cache: a, b, c

lru.get('a');    // Access 'a' → now most recently used → Cache order: b, c, a

lru.put('d', 4); // 'b' is least recently used, evicted → Cache: c, a, d

console.log(lru.get('b')); // -1 (evicted)
console.log(lru.get('a')); // 1 (still in cache)



// 🌀 .next()
// The next() method of Generator instances returns an object with two properties done and value. You can also provide a parameter to the next method to send a value to the generator.
// An iterator's .next() method returns an object like this:

// { value: 'a', done: false }
// value → the next key in the sequence

// done → true if we’ve reached the end