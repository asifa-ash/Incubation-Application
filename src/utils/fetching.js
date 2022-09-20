export function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:4000/admin/adminhome")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        resolve(result);
      });
  });
}
