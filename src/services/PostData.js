export function PostData(type, userData) {
  //let BaseURL = "http://10.0.2.11/react-php/api/index.php";
  //let BaseURL = "http://192.168.1.248/react-php/api/index.php";
  let BaseURL = "http://10.128.156.75/react-php/api/index.php";
  return new Promise((resolve, reject) => {
    fetch(BaseURL + "?tp=" + type, {
      method: "POST",
      body: JSON.stringify(userData)
    })
      .then(response => {
        try {
          response.json().then(res => {
            resolve(res);
          });
        } catch(error) {
          alert("There was an error. Try again.");
          console.log(error);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
