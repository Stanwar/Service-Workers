
if (('indexedDB' in window)){
    // Instantitate DB 
    var dbPromise = indexedDB.open('cache-test-db1', 1, function(upgradeDb) {
        // Create object store
        if (!upgradeDb.objectStoreNames.contains('files')) {
            upgradeDb.createObjectStore('files', {keyPath: 'id'});
        }
    });
}

