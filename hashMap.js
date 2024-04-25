class HashMap {
    constructor(initialCapacity = 16) {
        this.buckets = new Array(initialCapacity)
        this.size = 0 //number of key:value pairs
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.buckets.length;
    }

    set(key, value) {
        let index = this.hash(key);
        let originalIndex = index;
        let bucket = this.buckets
        if (this.size / this.buckets.length >= this.loadFactor) {
            this.buckets = [...bucket, ...new Array(this.buckets.length)];
        }

        if (this.buckets[index] === undefined) {
            this.buckets[index] = { key, value }
            this.size++;
            return;
        }

        while (this.buckets[index] !== undefined) {
            index = (index + 1) % this.buckets.length //linear probing
            if (this.buckets[index] === undefined) {
                this.buckets[index] = { key, value }
                this.size++;
                return;
            }
            if (index === originalIndex) {
                return; //prevent infinite loop in case of full hash map
            }
        }


    }

    get(key) {
        let index = this.hash(key)
        let originalIndex = index
        while (this.buckets[index] !== undefined) {
            if (this.buckets[index].key === key) {
                return `The Value of "${key} "is : ${this.buckets[index].value}`;
            }
            index = (index + 1) % this.buckets.length
            if (index == originalIndex) {
                return
            }
        }
        return null;
    }

    has(key) {
        let index = this.hash(key)
        let originalIndex = index
        while (this.buckets[index] !== undefined) {
            if (this.buckets[index].key === key) {
                return true;
            }
            index = (index + 1) % this.buckets.length
            if (index == originalIndex) {
                return
            }
        }
        return false;
    }


    remove(key) {
        let index = this.hash(key);
        let originalIndex = index;
        while (this.buckets[index] !== undefined) {
            if (this.buckets[index].key === key) {
                this.buckets.splice(index, 1, undefined);
                this.size--;
                return true;
            }
            index = (index + 1) % this.buckets.length;
            if (index === originalIndex) {
                return;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.size = 0;
        return (this.buckets = new Array(this.buckets.length));
    }

    keys() {
        let keysArr = [];
        if (this.length() !== 0) {
            for (let i = 0; i < this.buckets.length; i++) {
                if (this.buckets[i] !== undefined) {
                    keysArr.push(this.buckets[i].key);
                }
            }
        }
        return keysArr;
    }

    values() {
        let valuesArr = [];
        if (this.length() !== 0) {
          for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
              valuesArr.push(this.buckets[i].value);
            }
          }
        }
        return valuesArr;
      }
    
      entries() {
        let entriesArr = [];
        if (this.length() !== 0) {
          for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] !== undefined) {
              entriesArr.push([this.buckets[i].key, this.buckets[i].value]);
            }
          }
        }
        return entriesArr;
      }
}



const map = new HashMap()
map.set("momen", 24);
map.set("faf", 32);
map.set("fav", 29);
map.set("atfsd", 45);
map.set("AE", 14);
map.set("ZA", 54);
map.set("Ge", 96);
map.set("Hy", 32);
map.set("Fy", 12);
map.set("kyui", 65);
console.log(map.buckets);
console.log(map.get("kyui"));
console.log(map.has("kyui"));
console.log(map.has("AEF"));
console.log(map.remove("Fy"));
console.log(map.buckets);
console.log(map.length());
// console.log(map.clear());
console.log(map.buckets);
console.log(map.keys());
console.log(map.values());
console.log(map.entries());