# Scroll Less

This is a Next.js application that allow users to create there own rss feeds.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hadyrashwan/scroll-less.git
   ```

2. Navigate to the project directory:

   ```bash
   cd own-content-auth
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```env
    AUTH_SECRET="auth_secret"
    AUTH_RESEND_KEY=re_token
    AUTH_FROM_EMAIL_NO_REPLY=no-reply@own-content-mail.techcrafter.online
    DATABASE_URL="libsql://my-db.turso.io"
    DATABASE_AUTH_TOKEN=super_long_token
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Features

- User authentication (sign in, sign out)
- Create your own feed
- Add posts to your feed from various sources
- Expose as RSS feed
- Auth sync RSS feeds.

## Environment Variables

- `AUTH_SECRET`: Auth secret key
- `AUTH_RESEND_KEY` : Resend service api key
- `AUTH_FROM_EMAIL_NO_REPLY`: Email address to send emails from
- `DATABASE_URL`: Database url
- `DATABASE_AUTH_TOKEN`: Database auth token
## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
