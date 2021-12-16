// /src/components/Api/RetrieveDraftObject.js 

/* Retrievs a draft object using the current user's token and an object's 
draft id */

export default function RetrieveDraftObject(objectId, setObjectContents) {
  let objectContents = '';
  let userToken = '';

  JSON.parse(localStorage.getItem('user')).apiinfo.forEach((item) => {
    userToken = item.token;
  });

  fetch(`DRAFT/${objectId}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${userToken}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((res) => res.json()
      .then((data) => ({
        data,
        status: res.status
      }))
      .then((response) => {
        if (response.status === 200) {
          setObjectContents(response.data);
          console.log('Server return contents33: ', objectContents);
          localStorage.setItem('bco', JSON.stringify(objectContents));
        }
      }));
}
