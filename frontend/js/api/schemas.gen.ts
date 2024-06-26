// This file is auto-generated by @hey-api/openapi-ts

export const $AuthToken = {
  type: "object",
  properties: {
    username: {
      type: "string",
      writeOnly: true,
    },
    password: {
      type: "string",
      writeOnly: true,
    },
    token: {
      type: "string",
      readOnly: true,
    },
  },
  required: ["password", "token", "username"],
} as const;

export const $Comment = {
  type: "object",
  description: "Serializer class for Comment model.",
  properties: {
    id: {
      type: "string",
      format: "uuid",
      readOnly: true,
    },
    author_name: {
      type: "string",
      readOnly: true,
    },
    created: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
    modified: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
    content: {
      type: "string",
    },
    is_removed: {
      type: "boolean",
    },
    post: {
      type: "string",
      format: "uuid",
    },
    author: {
      type: "integer",
    },
  },
  required: [
    "author",
    "author_name",
    "content",
    "created",
    "id",
    "modified",
    "post",
  ],
} as const;

export const $Message = {
  type: "object",
  description: "Serializer to validate and serialize a message.",
  properties: {
    message: {
      type: "string",
    },
  },
  required: ["message"],
} as const;

export const $PaginatedCommentList = {
  type: "object",
  required: ["count", "results"],
  properties: {
    count: {
      type: "integer",
      example: 123,
    },
    next: {
      type: "string",
      nullable: true,
      format: "uri",
      example: "http://api.example.org/accounts/?offset=400&limit=100",
    },
    previous: {
      type: "string",
      nullable: true,
      format: "uri",
      example: "http://api.example.org/accounts/?offset=200&limit=100",
    },
    results: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Comment",
      },
    },
  },
} as const;

export const $PaginatedPostList = {
  type: "object",
  required: ["count", "results"],
  properties: {
    count: {
      type: "integer",
      example: 123,
    },
    next: {
      type: "string",
      nullable: true,
      format: "uri",
      example: "http://api.example.org/accounts/?offset=400&limit=100",
    },
    previous: {
      type: "string",
      nullable: true,
      format: "uri",
      example: "http://api.example.org/accounts/?offset=200&limit=100",
    },
    results: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Post",
      },
    },
  },
} as const;

export const $PaginatedUserList = {
  type: "object",
  required: ["count", "results"],
  properties: {
    count: {
      type: "integer",
      example: 123,
    },
    next: {
      type: "string",
      nullable: true,
      format: "uri",
      example: "http://api.example.org/accounts/?offset=400&limit=100",
    },
    previous: {
      type: "string",
      nullable: true,
      format: "uri",
      example: "http://api.example.org/accounts/?offset=200&limit=100",
    },
    results: {
      type: "array",
      items: {
        $ref: "#/components/schemas/User",
      },
    },
  },
} as const;

export const $PatchedUser = {
  type: "object",
  description: "Serializer for the User model.",
  properties: {
    id: {
      type: "integer",
      readOnly: true,
    },
    name: {
      type: "string",
      nullable: true,
      maxLength: 255,
    },
    slug: {
      type: "string",
      maxLength: 255,
      pattern: "^[-a-zA-Z0-9_]+$",
    },
    email: {
      type: "string",
      format: "email",
      maxLength: 255,
    },
    created: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
    modified: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
    last_login: {
      type: "string",
      format: "date-time",
      nullable: true,
    },
  },
} as const;

export const $Post = {
  type: "object",
  description: `Serializer for the Post model.

This serializer automatically generates fields based on the Post model.
It includes all the fields of the model for comprehensive data handling.`,
  properties: {
    id: {
      type: "string",
      format: "uuid",
      readOnly: true,
    },
    comments: {
      type: "array",
      items: {
        $ref: "#/components/schemas/Comment",
      },
      readOnly: true,
    },
    author_name: {
      type: "string",
      readOnly: true,
    },
    created: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
    modified: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
    title: {
      type: "string",
      maxLength: 255,
    },
    content: {
      type: "string",
    },
    is_draft: {
      type: "boolean",
    },
    author: {
      type: "integer",
    },
  },
  required: [
    "author",
    "author_name",
    "comments",
    "content",
    "created",
    "id",
    "modified",
    "title",
  ],
} as const;

export const $User = {
  type: "object",
  description: "Serializer for the User model.",
  properties: {
    id: {
      type: "integer",
      readOnly: true,
    },
    name: {
      type: "string",
      nullable: true,
      maxLength: 255,
    },
    slug: {
      type: "string",
      maxLength: 255,
      pattern: "^[-a-zA-Z0-9_]+$",
    },
    email: {
      type: "string",
      format: "email",
      maxLength: 255,
    },
    created: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
    modified: {
      type: "string",
      format: "date-time",
      readOnly: true,
    },
    last_login: {
      type: "string",
      format: "date-time",
      nullable: true,
    },
  },
  required: ["created", "email", "id", "modified", "slug"],
} as const;
