const dbName = "BlogAppDB";
const storeName = "images";

const openDB = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };
    request.onerror = (event) => reject(event.target.error);
    request.onsuccess = (event) => resolve(event.target.result);
  });

export const saveImage = (imageBlob, imageId) => {
  return openDB().then((db) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const imageData = { id: imageId, data: imageBlob };

    const request = store.put(imageData);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    });
  });
};

export const getImageURL = (imageId) => {
  console.log("Fetching image for ID:", imageId);
  return openDB()
    .then((db) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);

      const request = store.get(imageId);
      return new Promise((resolve, reject) => {
        request.onsuccess = (event) => {
          const result = event.target.result;
          console.log("Image retrieved:", result);
          if (result) {
            const blob = new Blob([result.data]);
            const url = URL.createObjectURL(blob);
            resolve(url);
          } else {
            reject("Image not found");
          }
        };
        request.onerror = (event) => {
          console.error("Error retrieving image:", event.target.error);
          reject(event.target.error);
        };
      });
    })
    .catch((error) => {
      console.error("Error opening DB:", error);
    });
};
