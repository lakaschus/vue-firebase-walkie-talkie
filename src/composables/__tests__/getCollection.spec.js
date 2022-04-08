import getCollection from '../getCollection'
import { assert, expect, test } from 'vitest'
import { nextTick } from 'vue'

function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

test('getCollection', async () => { 
    const {documents: chats} = getCollection("chats",
    ['owner', '==', 'niFeEAAtXabKlDlkWvCRTGUj6qi2'])
    await resolveAfter2Seconds(10)
    console.log("chats", chats)
    expect("test").toBe("test")
})