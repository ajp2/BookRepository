# BookRepository

BookRepository is an application that allows users to save books to a bookshelf, and create chapter summaries for each book.

![Home page](/docs/homepage_screenshot.png)

## Features

### Pull book information from Google Books API

The Google Books API is used to fetch a list of books based on a search query, as well as fetch information related to a single book.

```
export const searchBooks = query =>
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
      query)}&maxResults=20`
  ).then(res => res.json());

export const getBook = bookId =>
  fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    .then(res => res.json());
```

![Book Info](/docs/bookInfo_screenshot.png)

### Dependency Injection and Repository pattern

The repository pattern was used alongside dependency injection to allow for the ability to change the repository implementation at a later date, or for testing purposes.

```
services.AddScoped<IBookRepository, EFBookRepository>();
services.AddScoped<IChapterRepository, EFChapterRepository>();
```

```
IChapterRepository _repo;

public ChaptersController(IChapterRepository repo)
{
    _repo = repo;
}
```

### JWT Authentication with ASP.NET Core Identity

When users login or sign up, they are sent a JWT token, which is then saved in to the request header. Each time a request is sent to the server, the JWT token is included in the header, at which point Identity determines if the token is valid and all the details of the user.

```
services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;

    var signingKey = Encoding.UTF8.GetBytes(Configuration["JwtSettings:Secret"]);
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ... // see code for more details
    };
});
```

![Sign up page](/docs/auth_screenshot.png)

## Technologies Used

- C#
- ASP.NET Core
- Swagger API
- JavaScript
- React (Hooks + Context API)
- React Router
- MS SQL Server
- Entity Framework
- JWT, Identity
- Material UI

## Challenges

- Adding JWT authentication with Identity
  - Mainly researching all the boiler plate configuration options needed to enable JWT authentication as opposed to the default cookie based auth
- Component structure
  - Some components had to be refactored a few times so that they could be reused (including the BookList and Auth components)
  - The parent components also had to be refactored to fix errors from the above step

## Possible Feature to Add

- Drag chapter summaries to change their order
- Add reviews to books which can be seen by anyone
- Create and send JWT refresh tokens
