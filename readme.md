## Development

```bash
docker compose up
```
- obviously docker containers are optimized for production (only for test purposes)
- for production environment, we need more complex setup, e.g. 
    - build and serve client as static assets with nginx instead of node
    - setup node proccess manages for server
    - ...

## Client
running at port 5173

## Server
running at port 8000


## Endpoint
 - signup - POST http://localhost:8000/api/auth/signup
 - signin - POST http://localhost:8000/api/auth/signin

 - password-forgot - POST http://localhost:8000/api/auth/password-forgot
 - password-reset-verify - POST http://localhost:8000/api/auth/password-forgot-verify
 - password-reset - POST http://localhost:8000/api/auth/password-reset
 - google signin - POST http://localhost:8000/api/auth/oauth/google

 - refresh - POST not implemented
 - logout - POST not implemented


## Notes
- to overcome the `remembre me` on signin, i've just added a expiry to the token so that it expires in 30 days from now. otherwise, the token will expire in 2 hours. (knowing that this is not the best way of doing it)
- a better solution would be give a refreshToken to the user with longer expiry time (d.g. 1 year) (in our case it would be 30 days) 
    and the set the exp time for acessToken to a smaller time (e.g. 15minutes)
    with that in mind we can renew the access token with the givven refresh token till it is valid.

- also to be more secure, i'd like to persist the sessions in db with the key to the user, so whenever admin wants to invalidate the users session, he/she will be loged out immedietly

- the `reset-password` flow is working as expected, im just passing the code as a query strig to the next page to make testing much easier.

- email preview link will be logged to the console if you want to check if its working

- I choosed to implement a `monorepo` so that i can share the common code between apps (even thgouth i never used it in this case), just wnated to show what it would looks like in more realistic senarios