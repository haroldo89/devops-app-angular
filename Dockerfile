FROM node:12.16.1-alpine As builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
#RUN npm install -g @angular/cli
COPY . .
RUN npm run build --prod
#RUN npm run build -- --base-href='/front/' --prod
#RUN ng build --base-href "/front/" --prod

FROM nginx:1.15.8-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist/taller/ /usr/share/nginx/html