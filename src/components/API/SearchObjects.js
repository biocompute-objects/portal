// /src/components/Api/SearchObjects.js

/* Retrievs a draft object using the current user's token and an object's
draft id */
import PropTypes from 'prop-types';

export default function SearchObjects(action, searchLocation, search, setRows) {
  fetch(`${searchLocation[0]}/api/objects/search/`, {
    method: 'POST',
    body: JSON.stringify({
      POST_api_objects_search: [
        {
          type: action,
          search,
        }
      ]
    }),
    headers: {
      Authorization: `Token ${searchLocation[1]}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then((data) => {
            // console.log('data', data);
            setRows(data);
          });
      }
      return response.json()
        .then((data) => {
          console.log('data', data);
          alert(`${data.message}`);
        });
    }).catch((error) => {
      console.log(`error: ${error}`);
      alert(`Retrieve object FAILED! ${error}`);
    });
}

SearchObjects.PropTypes = {
  action: PropTypes.string.isRequired,
  searchLocation: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  setRows: PropTypes.func
};
