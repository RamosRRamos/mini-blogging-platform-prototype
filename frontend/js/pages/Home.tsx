import {format} from "date-fns";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import isAuthenticated from "utils/isAuthenticated";
import {ApiService, Post} from "../api";
import "../../sass/pages/home.scss";


const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Chamada para obter a lista de posts assim que o componente for montado
    ApiService.apiPostsList().then((response) => {
      console.log(response);
      setPosts(response.results);
      console.log(posts);
    });
  }, []); // Executa somente uma vez, após a montagem do componente

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      requestBody: {
        id: "",
        title,
        content,
        created: "",
        modified: "",
        author: 0,
        author_name: "",
        comments: [],
      },
    };

    try {
      const response = await ApiService.apiPostsCreate(data);
      console.log("Post created successfully:", response);
      // Limpar o formulário após o envio bem-sucedido
      setTitle("");
      setContent("");

      // Após criar o post, atualize a lista de posts
      ApiService.apiPostsList().then((response) => {
        setPosts(response.results);
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const commentIsAuthenticated = () => {
    if (isAuthenticated) {
      return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formContent">
            <Form.Label/>
            <Form.Control
              as="textarea"
              placeholder="Enter your reply"
              rows={2}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <div className="text-end">
            <Button className="mt-3" type="submit">
              Reply
            </Button>
          </div>
        </Form>
      );
    }
    return (
      <p>
        Please <a href="/login">login</a> to comment.
      </p>
    );
  };

  const postIsAuthenticated = () => {
    if (isAuthenticated) {
      return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter content"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-3" type="submit">
            Create a post
          </Button>
        </Form>
      );
    }
    return (
      <p>
        Please <a href="/login">login</a> to create a post.
      </p>
    );
  };

  const yourLatestPostsIsAuthenticated = () => {
    if (isAuthenticated) {
      return <></>;
    }
    return (
      <p>
        Please <a href="/login">login</a> to see your latest posts .
      </p>
    );
  };

  const commentIsAuthenticatedManager = () => {
    if (isAuthenticated) {
      return (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter content"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Button className="mt-3" type="submit">
            Create a post
          </Button>
        </Form>
      );
    }
    return (
      <p>
        Please <a href="/login">login</a> to manage your comments.
      </p>
    );
  };

  const postIsAuthenticatedManager = () => {
    if (isAuthenticated) {
      return <Button>Manage Posts</Button>;
    }
    return (
      <p>
        Please <a href="/login">login</a> to manage your posts.
      </p>
    );
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <Card className="mb-3">
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <div className="avatar-placeholder me-2">
              <span className="avatar-letter">
                {post.author_name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="mb-0">
                <small className="text-muted">{post.author_name}</small>
              </p>
              <p className="mb-0">
                <small className="text-muted">
                  {format(new Date(post.created), "dd/MM/yyyy")}
                </small>
              </p>
            </div>
          </div>
          <h4 className="card-title">{post.title}</h4>
          <p className="card-text">{post.content}</p>
          <hr/>
          <p className="mb-0">
            <small className="text-muted">
              Last Modified: {format(new Date(post.modified), "dd/MM/yyyy")}
            </small>
          </p>
        </Card.Body>
        <Col className="m-3">
          <Form onSubmit={handleSubmit}>{commentIsAuthenticated()}</Form>
        </Col>
        <ul className="list-group list-group-flush">
          {post.comments.map((comment, index) => (
            <li key={index} className="list-group-item mt-3 mb-3">
              <p>{comment.content}</p>
              <div className="d-flex align-items-center">
                <div className="avatar-placeholder me-2">
                  <span className="avatar-letter">
                    {comment.author_name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="mb-0">
                    <small className="text-muted">
                      By: {comment.author_name}
                    </small>
                  </p>
                  <p className="mb-0">
                    <small className="text-muted">
                      Posted At:{" "}
                      {format(new Date(comment.created), "dd/MM/yyyy")}
                    </small>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* Adicione aqui a lista de comentários se necessário */}
      </Card>
    ));
  };

  return (
    <Container className="full-home" fluid>
      <Row className="mt-3 mb-3"/>

      <Row className="mt-3 mb-3">
        <Col md={4}>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>Manage your posts</Card.Title>
                <Card.Text>Manage your blog posts here.</Card.Text>
                {postIsAuthenticatedManager()}
              </Card.Body>
            </Card>
          </Col>
          <Col className="mt-3" md={12}>
            <Card>
              <Card.Body>
                <Card.Title>Comments</Card.Title>
                <Card.Text>View and moderate comments on your blog.</Card.Text>
                {commentIsAuthenticatedManager()}
              </Card.Body>
            </Card>
          </Col>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Create a new Post</Card.Title>
              {postIsAuthenticated()}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3 mb-3">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="latest-posts-title">
                Your Latest Posts
              </Card.Title>
              <Card.Text>
                <ul className="latest-posts-list">
                  {yourLatestPostsIsAuthenticated()}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>{renderPosts()}</Col>
      </Row>
    </Container>
  );
};
export default Home;
