# build and config environment
FROM keymetrics/pm2:14-alpine
WORKDIR /app
COPY . .

RUN apk add --no-cache \
    build-base \
    g++ \
    cpulimit

# Install dependencies 
RUN yarn global add pm2
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:max_size 10M
RUN pm2 set pm2-logrotate:retain 30
RUN yarn install --ignore-engines
RUN yarn build

EXPOSE 3000

RUN mkdir -p /app/logs

RUN ln -sf /proc/1/fd/1 /app/logs/info.log \
    && ln -sf /proc/1/fd/2 /app/logs/error.log \
    && ln -sf /proc/1/fd/1 /app/logs/debug.log

# RUN
CMD [ "sh", "start-app.sh" ]
