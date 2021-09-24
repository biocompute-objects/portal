// /src/components/API/RetrieveDraftObjectPermissions.js 

/* Retrievs a draft object using the current user's token and an object's 
draft id */

export default function RetrieveDraftObjectPermissions(objectId) {
    let obectContents = JSON.parse(localStorage.getItem('bco'));
    let userToken = '';

    JSON.parse(localStorage.getItem('user')).apiinfo.forEach((item) => {
      userToken = item.token;
    });
    console.log('bco', obectContents['object_id'])
    fetch("http://localhost:8000/api/objects/drafts/permissions/", {
      method: 'POST',
      body: JSON.stringify({
          POST_api_objects_drafts_permissions: [
          	{
  				object_id: obectContents['object_id']
          	}
          ]
      }),
      headers: {
        Authorization: `Token ${userToken}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('POST_api_objects_drafts_permissions: Success!');
          } else {
            console.log('POST_api_objects_drafts_permissions: FAILED!');
          };
        });
  }
