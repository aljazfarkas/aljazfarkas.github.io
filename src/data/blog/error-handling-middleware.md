---
author: Aljaž Farkaš
pubDatetime: 2026-05-15T07:21:00Z
title: Error handling middleware
slug: error-handling-middleware
featured: true
draft: false
tags:
  - Node.js
  - Error handling
description: How to scale your error handling in Node.js
---

I have recently been wondering how to scale my error handling in Express (or similar frameworks). It always seems to be a pain to do it properly and be able to scale it. You either handle it on the spot where the error occurs, or you define a single global error handler. Both of which seem to fail apart every once in a while. So I'm writing this blog post to iterate on it, and try to make sense of it all.

## Beginning

Imagine you want to create a new user in the database.

```ts
// File: middleware.js
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});
```

This works fine, but how to handle an error in case the database connection fails?

```ts
// File: middleware.js
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});
```

Simple, right? You can gracefully handle the error in a single place and send a response to the client. Unfortunately, this is not very flexible. What if instead the database connection failing, validation fails? We might want to return a 400 status code in that case, as to not confuse the client.

## Making it flexible

We could check error messages in the middleware, and return a different status code depending on the error, and return a client friendly error message.

```ts
// File: middleware.js
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    if (error.message.includes('Validation failed')) {
      return res.status(400).json({ error: 'Validation failed. Please check your input.' });
    }

    res.status(500).json({ error: 'Failed to create user. Please try again later.' });
  }
});
```

Not nice, right? Seems very brittle. What if we change the error message? We would have to remember to update the middleware too. What if we don't remember? Spooky.

## Custom error class

We could create a couple of custom error classes that would allow us to handle different error types in a single place in a less spooky way.

```ts
// File: errors/validation-error.js
class ValidationError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

// File: errors/database-error.js
class DatabaseError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}
```

We would expect that `User.create` throws a `ValidationError` or `DatabaseError` if something goes wrong. We can then handle them in our middleware.

```ts
// File: middleware.js
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    if (error instanceof ValidationError || error instanceof DatabaseError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    res.status(500).json({ error: 'Failed to create user' });
  }
});
```

Seems much safer, right? We can now handle different error types in a single place. We can also add more specific error types if we want to. But unfortunately, this is not the end of the story.
Adding all this boilerplate on every route for every error type is not scalable. We need a better solution.

## Global error handler

We can create a global error handler that would handle all our errors.


