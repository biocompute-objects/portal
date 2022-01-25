// /src/components/Api/RetrievePublishedObject.js

/* Retrievs a draft object using the current user's token and an object's
draft id */

export default function RetrievePublishedObject(objectId, setObjectInfo, setLoading, loading) {
  console.log('RetrievePublishObject Call');

  fetch(`${objectId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json()
          .then((data) => {
            console.log('data', data[0]);
            setObjectInfo(data[0]);
            setLoading(false);
          });
      }
    }).catch((error) => {
      console.log(`error: ${error}`);
    //   alert(`Retrieve object FAILED! ${error}`);
    });
}
