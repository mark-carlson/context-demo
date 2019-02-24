import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import Consumer from "../context/configContext";

import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

import '../styles/books.css';

class Books extends Component {
  state = {
    title: "",
    author: "",
    synopsis: "",
    books: []
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Consumer>
        {(context) => {
          const { books } = context.library || [];
          return (
          <Container fluid>
            <Row>
              <Col size="md-6">
                <Jumbotron>
                  <h1>What Books Should I Read?</h1>
                </Jumbotron>
                <form>
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                    />
                  <Input
                    value={this.state.author}
                    onChange={this.handleInputChange}
                    name="author"
                    placeholder="Author (required)"
                    />
                  <TextArea
                    value={this.state.synopsis}
                    onChange={this.handleInputChange}
                    name="synopsis"
                    placeholder="Synopsis (Optional)"
                    />
                  <FormBtn
                    disabled={!(this.state.author && this.state.title)}
                    onClick={this.handleFormSubmit}
                    >
                    Submit Book
                  </FormBtn>
                </form>
              </Col>
              <Col size="md-6 sm-12">
                <Jumbotron>
                  <h1>Books On My List</h1>
                </Jumbotron>
                {this.state.books.length ? (
                  <List>
                    {this.state.books.map(book => (
                      <ListItem key={book._id}>
                        <button className="like" onClick={()=> context.library.incrementLikes(book._id)}><i className="fas fa-thumbs-up"></i>
                          <span className="like-count">{(books.find(search => search.id === book._id)) ? books.find(search => search.id === book._id).likes : 0}</span>
                        </button>
                        <Link to={"/books/" + book._id}>
                          <strong>
                            {book.title} by {book.author}
                          </strong>
                        </Link>
                        <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                  )}
              </Col>
            </Row>
          </Container>
        )}
        }
      </Consumer>
    );
  }
}

export default Books;
