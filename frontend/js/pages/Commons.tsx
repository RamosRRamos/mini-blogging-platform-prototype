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

export const PostUpdate: React.FC<PostUpdateProps> = ({ posts }) => {
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isDraft, setIsDraft] = useState<boolean>(false);

  const handleEditPost = (post: Post) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setIsDraft(post.is_draft);
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setTitle("");
    setContent("");
    setIsDraft(false);
  };

  const handleDeletePost = async (postId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        await ApiService.apiPostsDestroy({ id: postId });
        console.log("Post deleted successfully");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      id: editingPostId || "",
      requestBody: {
        id: editingPostId || "",
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
      console.log("Post updated successfully:", response);

      // Limpar o formulário após o envio bem-sucedido
      setTitle("");
      setContent("");
      setIsDraft(false);
      setEditingPostId(null);

      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <hr />
      <h2>Edit or Delete Posts</h2>
      {posts.map((post) => (
        <Card key={post.id} className="mb-3 shadow-sm">
          <Card.Body>
            <div className="d-flex flex-column">
              {editingPostId === post.id ? (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formTitle">
                    <Form.Control
                      className="mb-2"
                      placeholder="Enter title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formContent">
                    <Form.Control
                      as="textarea"
                      placeholder="Enter content"
                      rows={3}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formIsDraft" className="my-2">
                    <Form.Check
                      type="checkbox"
                      label="Is Drafted"
                      checked={isDraft}
                      onChange={(e) => setIsDraft(e.target.checked)}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" className="me-2">
                      Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  <h4 className="card-title">{post.title}</h4>
                  <p className="card-text">{post.content}</p>
                  <p className="mb-0 text-muted">
                    <small>Last Modified: {format(new Date(post.modified), "dd/MM/yyyy")}</small>
                  </p>
                  <div className="d-flex justify-content-end mt-2">
                    <Button variant="outline-primary" className="me-2" onClick={() => handleEditPost(post)}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleDeletePost(post.id)}>
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};




