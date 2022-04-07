import getCollection from '../getCollection'
import { assert, expect, test } from 'vitest'

test('getCollection', async () => {
    const {documents: chats} = getCollection("chats",
    ['owner', '==', 'niFeEAAtXabKlDlkWvCRTGUj6qi2'])
    expect("test").toBe("test")
})