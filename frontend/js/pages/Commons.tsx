import React, {useState} from 'react';
import {Button, Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import {ApiService, Post} from "api";
import Form from "react-bootstrap/Form";


interface PostListProps {
  posts: Post[];
  commentIsAuthenticated: () => JSX.Element;
  handleCommentSubmit: (postId: string, event: React.FormEvent) => void;
}

export const PostList: React.FC<PostListProps> = ({posts, commentIsAuthenticated, handleCommentSubmit}) => {
  const renderPosts = () => {
    const filteredPosts = posts.filter(post => !post.is_draft);
    return filteredPosts.map(post => (
      <Card key={post.id} className="mb-3">
        <Card.Body>
          <div className="d-flex align-items-center mb-3">
            <div className="avatar-placeholder me-2">
              <span className="avatar-letter">
                {post.author_name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="mb-0">
                <small className="text-muted">
                  <Link to={`/profile/${post.author_name}`}>{post.author_name}</Link>
                </small>
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
          <Form onSubmit={(event) => handleCommentSubmit(post.id, event)}>
            {commentIsAuthenticated()}
          </Form>
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
                      By: <Link to={`/profile/${comment.author_name}`}>{comment.author_name}</Link>
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

  return <>{renderPosts()}</>;
};


interface PostUpdateProps {
  posts: Post[];
}

interface PostUpdateProps {
  posts: Post[];
}

export const PostUpdate: React.FC<PostUpdateProps> = ({posts}) => {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const handleEditPost = (postId: string) => {
    setEditingPostId(postId);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      id: "",
      requestBody: {
        id: "",
        title,
        content,
        created: "",
        modified: "",
        author: 0,
        author_name: "",
        comments: [],
        is_draft: isDraft,
      },
    };

    try {
      const response = await ApiService.apiPostsUpdate(data);
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


  function handleDeletePost(id: string) {

  }

  return (
    <div>
      <hr/>
      <h2>Edit or Delete Posts</h2>
      {posts.map((post) => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {editingPostId === post.id ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        placeholder="Enter title"
                        type="text"
                        value={post.title}
                        onChange={(e) => {
                          // Implementar a lógica para atualizar o estado do título do post
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formContent">
                      <Form.Label>Content</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Enter content"
                        rows={3}
                        value={post.content}
                        onChange={(e) => {
                          // Implementar a lógica para atualizar o estado do conteúdo do post
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="formIsDraft">
                      <Form.Check
                        type="checkbox"
                        label="Is Drafted"
                        checked={post.is_draft}
                        onChange={(e) => {
                          // Implementar a lógica para atualizar o estado do rascunho do post
                        }}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Form>
                ) : (
                  <>
                    <h4 className="card-title">{post.title}</h4>
                    <p className="card-text">{post.content}</p>
                    <p className="mb-0">
                      <small className="text-muted">
                        Last Modified: {format(new Date(post.modified), 'dd/MM/yyyy')}
                      </small>
                    </p>
                  </>
                )}
              </div>
              <div>
                <Button variant="primary" onClick={() => handleEditPost(post.id)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDeletePost(post.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};



