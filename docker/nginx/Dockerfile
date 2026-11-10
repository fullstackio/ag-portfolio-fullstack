FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -q --spider http://localhost:80 || exit 1
