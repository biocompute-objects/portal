// /src/components/Api/ModifyDraftObject.js 

/* Modifies a draft object using the current user's token and an object's 
draft id */

export default function ModifyDraftObject( ) {
  let obectContents = JSON.parse(localStorage.getItem('bco'));
  let userToken = localStorage.getItem('token');

  JSON.parse(localStorage.getItem('user')).apiinfo.forEach((item) => {
    userToken = item.token;
  });
  console.log('bco', userToken, localStorage.getItem('bco'))
  fetch("http://localhost:8000/api/objects/drafts/modify/", {
    method: 'POST',
    body: JSON.stringify({
        POST_api_objects_drafts_modify: [
        	{
        		contents:   obectContents,
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

        console.log('POST_api_objects_drafts_modify: Success!');
          localStorage.removeItem('bco');
        } else {
          console.log('POST_api_objects_drafts_modify: FAILED!');
        };
      });
}
