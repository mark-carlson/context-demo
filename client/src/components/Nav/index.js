import React from "react";
import { Link } from "react-router-dom";
import Consumer from "../../context/configContext";

function Nav() {
  const getTotalLikes = (books) => {
    return books.reduce((tally, book) => {
      return tally + book.likes;
    }, 0);
  }
  return (
    <Consumer>
      {context => {
        return (
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                  React Reading List
                  </Link>
              </div>
              <div className="nav navbar-nav navbar-right text-white">Total Likes: {getTotalLikes(context.library.books)}</div>
            </div>
          </nav>
        )
      }
      }
    </Consumer>
  );
}

export default Nav;
