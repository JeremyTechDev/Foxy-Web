/*
SHITY FUNCTION WILL TEMPORALY STAND HERE
*/
export const updateSidebar = () => {
  let sidebar = document.getElementById("sidebar");
  let header = document.getElementById("header");
  let books = document.getElementById("books");
  let btnSidebar = document.getElementById("btn-sidebar");

  //if its hidden
  if (sidebar.style.left === "-20%") {
    //center all components
    sidebar.style.left = "0";
    header.style.marginLeft = "20%";
    books.style.marginLeft = "20%";
    btnSidebar.style.left = "20%";
  } else {
    sidebar.style.left = "-20%";
    header.style.marginLeft = "0";
    books.style.marginLeft = "auto";
    books.style.width = "100%";
    btnSidebar.style.left = "0";
  }
  //change class from light(hidden) to dark(shown)
  btnSidebar.classList.toggle("btn-sidebar-light");
}
