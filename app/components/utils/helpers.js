// Include the axios package
import axios from "axios";
// NYT API
const authKey = "5c4953b3d9a64372a9b2d64f55d8d089";
// Helper Functions
const helpers = {
  runQuery: (searchTerm) => {
    console.log("have serch pass to query: " + searchTerm);
    // search query.
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + searchTerm;
    return axios.get(queryURL).then((response) => {
      console.log(response);

      if(response.data.response.docs[0]) {
      	return response.data.response.docs;
      } else {
      	return "";
      }
    });
  },

  // Todo: adding a del button to cal on server js

  // Hit server
  getSaved: () => {
  	return axios.get("/api/saved");
  },

  saveArticle: (articleTitle, articleDate, articleURL) => {

  	console.log("we have article to save: " + articleTitle);
  	console.log("saved: " + articleDate);

  	return axios.post("/api/saved",
  		{
  			title: articleTitle,
  			date: articleDate,
        url: articleURL
  		}
  	);
  },


  deleteArticle: (articleID) => {

  	console.log("article to delete: " + articleID);

  	return axios.delete("/api/saved/" + articleID)

  	.then(res =>  {
  		console.log("Del from axios: " + res);
  	})
  	.catch(err => {
  		console.log("Error pushing for deletion: " + err);
  	});

  }

};
// Export the helpers
export default helpers;
