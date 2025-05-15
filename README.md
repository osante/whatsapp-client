# wacraft-client

This is the frontend for the **[wacraft project](https://github.com/Astervia/wacraft)** — a development platform for the WhatsApp Cloud API.

With **wacraft**, you can send and receive WhatsApp messages, handle webhooks, and perform a wide variety of operations using a consistent and extensible API.

For details on client usage, see:

- 🔗 [wacraft repository](https://github.com/Astervia/wacraft): full-featured platform for supporters.
- 🔗 [wacraft-lite repository](https://github.com/Astervia/wacraft): optimized for typical use cases and non-supporters.

Both repositories include full API documentation.

This `README.md` focuses on the Glient (this repo).

## 🧪 Getting Started

### 📦 Environment Variables

Create your `.env` file:

```bash
cp example.env .env
```

Fill in your credentials and other required values. Descriptions for each variable are included in `example.env`.

> ⚠️ **Don't skip variables or remove them unless you're sure.**

### 🐳 Running with Docker (Recommended for production)

Build the image and run with

```bash
docker run -d \
  --name wacraft-client \
  --env-file .env \
  -p 80:80 \
  wacraft-client:latest
```

The application is behind an Nginx reverse proxy, which is configured to serve the application on port 80, so you'll have access to i18n features with this configuration.

### Running with Angular CLI (Recommended for development)

Simply hit

```bash
ng serve
```

You can explore `--configuration=production` and `--configuration=development` for different build configurations.

## Deploy

### Vercel

You can straightforwardly deploy the application to Vercel. Just create a new project and link it to this repository. Fill the environment variables in the Vercel dashboard and let the configurations on the project do the rest.

## i18n

To extract an i18n file, run the following command:

```bash
ng extract-i18n --output-path src/locale
```

## 🐋 Docker Image

### 🔨 Build Instructions

To support private modules when building the Docker image, use SSH forwarding:

```bash
docker build --ssh default -t wacraft-client:latest -f Dockerfile .
```
