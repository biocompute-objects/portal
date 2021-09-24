// /src/components/API/RetrieveDraftObjectPermissions.js 

/* 
Retrievs all objects for a token using the current user's token and puts in local storag
*/

export default function RetrieveDraftObjectPermissions( ApiInfo ) {
  let tokenContents = '';
  let userToken = ApiInfo.token;

  console.log(ApiInfo);
  
  fetch(`${ApiInfo['public_hostname']}/api/objects/token/`, {
    method: 'POST',
    body: JSON.stringify({
      POST_api_objects_token: {}
    }),
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
        tokenContents = response.data;
        localStorage.setItem('tokenContents', JSON.stringify(tokenContents))
        console.log('POST_api_objects_token: ', tokenContents);
      } else {
        console.log('POST_api_objects_token: FAILED!');
      }
    })
  )
}
