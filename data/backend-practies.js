const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  // wait the response from the backend
  console.log(xhr.response); // save the response from the back end and load the the console
});

// xhr.open("GET", "https://supersimplebackend.dev/products/first");
xhr.open("GET", "https://supersimplebackend.dev/images/apple.jpg");
xhr.send(); // send the response to the backend;
