# Portfolio
My personal website with my CV, social links and documented projects.

# Technologies used
### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-%23252529.svg?style=for-the-badge&logo=vitest&logoColor=FCC72B)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
### Hosting
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-%23F38020.svg?style=for-the-badge&logo=Cloudflare&logoColor=white)
### External APIs
![Spotify](https://img.shields.io/badge/Spotify-%231ED760.svg?style=for-the-badge&logo=spotify&logoColor=white)


# Behind the scenes
The content is hosted via Cloudflare's workers - the backend is uploaded as two workers: one serves the static content built from React, and the other responds to an API endpoint at `/api`.
### Frontend - `./web`
The frontend is constructed using React (TSX) and TailwindCSS for styling. Pure CSS was used for some animations and repeated styles to avoid clutter.
Static data presented on the webpage can be found in `staticData.ts` and the individual components in the `components` folder, organized by complexity.
### Backend - `./worker`
The backend makes use of Cloudflare's Workers ecosystem and its DurableObjects, which have access to their own small SQLite storage. It reuses a pre-provided Refresh Token to acquire an Access Token for the Spotify WebAPI, from which it fetches the currently playing song and returns it at `/api/getCurrentSong`.

The access token is valid for an hour, so it is cached in two tiers (L1, L2). The first layer stores the token in a variable, reusing it for subsequent requests. However, on idle, Cloudflare re-spawns the workers so this may be wiped. The second layer stores this access account in the SQLite storage for recall, which is faster than polluting Spotify's OAuth2 endpoints.

# Build & Hosting
The GitHub Workflow found at `.github/workflows/cloudflare-deploy.yml` automatically builds and deploys the worker and its static content to Cloudflare on push to the main branch.

### To deploy from the commandline:
1. Put `SPOTIFY_REFRESH_TOKEN` and `SPOTIFY_BASIC_AUTH` into an .env file. Refer to [this](https://developer.spotify.com/documentation/web-api/tutorials/code-flow) and [this](https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens) on how to obtain them.
2. Run `npm run deploy -- --secrets-file .env`.
3. You should see your newly deployed URL in the command output.

### To deploy automatically on push:
1. Deploy once from the commandline to assign the needed secrets to your Cloudflare project.
2. [Create a Cloudflare API token](https://dash.cloudflare.com/profile/api-tokens/)
3. On your GitHub reposity, under `Settings > Secrets and variables > Actions` add your API token as `CLOUDFLARE_API_TOKEN` into secrets, and `CLOUDFLARE_ACCOUNT_ID` into variables.
4. Push a commit that changes source code or launch the workflow manually in the `Actions` tab.
