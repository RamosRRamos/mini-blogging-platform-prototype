import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, FormLabel, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router";

import { ApiService, Post } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(false);
    setError("");
    const data = {
      formData: {
        username,
        password,
        token: "string",
      },
    };
    console.log("Entrou");
    try {
      const response = await ApiService.apiObtainAuthTokenCreate(data);
      console.log("Post created successfully:", response);
      if (response.token) {
        document.cookie = `token=${response.token}`;
      }
      // Limpar o formulário após o envio bem-sucedido
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const { userSlug } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!userSlug) {
      return;
    }
    const data = {
      slug: userSlug,
    };

    // Chamada para obter a lista de posts assim que o componente for montado
    ApiService.apiPostsList2(data).then((response) => {
      console.log("Posts API - Profile return:", response);
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
        author_name:"",
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

  const user = {
    name: "John Doe",
    email: "",
    posts,
  };

  const author = "Autor do Post";
  const createdAt = "01 de janeiro de 2023";
  const lastModified = "05 de janeiro de 2023";
  const comments = [
    {
      text: "Comentário 1",
      author: "Autor do Comentário 1",
      createdAt: "02 de janeiro de 2023",
    },
    {
      text: "Comentário 2",
      author: "Autor do Comentário 2",
      createdAt: "03 de janeiro de 2023",
    },
    {
      text: "Comentário 3",
      author: "Autor do Comentário 3",
      createdAt: "04 de janeiro de 2023",
    },
  ];

  return (
    <Container fluid>
      <Row className="mt-3 mb-3">
        <Col>
          <h1>Dashboard</h1>
        </Col>
      </Row>

      <Row className="mt-3 mb-3">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Create a new Post</Card.Title>
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
                <Button type="submit" variant="success">
                  Create a post
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage your posts</Card.Title>
              <Card.Text>Manage your blog posts here.</Card.Text>
              <Button variant="success">Manage Posts</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Comments</Card.Title>
              <Card.Text>View and moderate comments on your blog.</Card.Text>
              <Button variant="success">Manage Comments</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3 mb-3">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Últimos Posts</Card.Title>
              <Card.Text>
                <ul>
                  {user.posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                  ))}
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <h2 className="card-title">{title}</h2>
              <p className="card-text">{content}</p>
              <p className="card-text">
                <small className="text-muted">Author: {author}</small>
              </p>
              <p className="card-text">
                <small className="text-muted">Created At: {createdAt}</small>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Last Modified: {lastModified}
                </small>
              </p>
            </Card.Body>
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-light mt-3 mb-3">
                <h3>Comments</h3>
              </li>
              {comments.map((comment, index) => (
                <li key={index} className="list-group-item mt-3 mb-3">
                  <p>{comment.text}</p>
                  <p className="card-text">
                    <small className="text-muted">By: {comment.author}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Posted At: {comment.createdAt}
                    </small>
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
