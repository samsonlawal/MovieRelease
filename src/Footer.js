import React from "react";

export default function Footer(props) {
  // const pagelink = [];

  for (let i = 1; i <= props.pages + 1; i++) {
    // let active = props.currentPage == i ? "active" : "";
    // pagelink.push(
    //   <li
    //     className={`${active}`}
    //     key={i}
    //     onClick={() => {
    //       props.nextPage(props.currentPage);
    //     }}
    //   >
    //     <a href="#">{i}</a>
    //   </li>
    // );
  }

  return (
    <div className="footer-div">
      <div className="btns">
        {props.currentPage > 1 ? (
          <button
            onClick={() => {
              props.nextPage(props.currentPage - 1);
            }}
          >
            Prev
          </button>
        ) : (
          ""
        )}

        <button
          id="currentPage"
          onClick={() => {
            console.log(props.numberOfPages);
            // props.nextPage(props.currentPage - 1);
          }}
        >
          Page {props.currentPage}
        </button>

        {props.currentPage < props.numberOfPages ? (
          <button
            onClick={() => {
              props.nextPage(props.currentPage + 1);
            }}
          >
            Next
          </button>
        ) : (
          ""
        )}
      </div>
      <p className="copyright">copyright © 2021.</p>
    </div>
  );
  /* <article>
        <h1>Get Quick Update on New Movies and TV Series Release</h1>
      </article> */
}
