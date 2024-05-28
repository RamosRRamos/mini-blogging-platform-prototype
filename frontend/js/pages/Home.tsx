import {useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";


const Home = () => {



  const user = {
    name: "John Doe",
    email: "",
    posts: [{id: 1, title: "Post 1"}, {id: 2, title: "Post 2"}],
  };

  const title = "Título do Post";
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est quis massa tincidunt lacinia ac eget tellus. Nullam eu elit et risus varius pellentesque. Sed pharetra felis in mauris scelerisque, vitae consectetur libero rhoncus. Vivamus venenatis ex at purus sagittis interdum. Duis vitae elit id tellus iaculis vehicula. Integer in ipsum vitae justo feugiat dictum. Suspendisse potenti. Proin rutrum, nulla eget finibus efficitur, nisl arcu posuere tortor, et malesuada sapien odio eget purus. Donec ut turpis ac velit volutpat posuere. In vel elit non metus hendrerit tempus. Sed in mi augue.";
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
    <>
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
                <Card.Text>Start a new post</Card.Text>
                <Button variant="success">
                  Create a post
                </Button>
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
                  <small className="text-muted">Last Modified: {lastModified}</small>
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
                      <small className="text-muted">Posted At: {comment.createdAt}</small>
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
