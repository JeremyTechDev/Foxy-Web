export function PostData(type, userData) {
  //let BaseURL = "http://10.0.2.11/react-php/api/index.php";
  let BaseURL = "http://192.168.1.146/react-php/api/index.php";
  return new Promise((resolve, reject) => {
    fetch(BaseURL + "?tp=" + type, {
      method: "POST",
      body: JSON.stringify(userData)
    })
      .then(response => {
        response.json().then(res => {
          resolve(res);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}