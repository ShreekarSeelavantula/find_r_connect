# FindRConnect Render Deployment Guide

## Changes Made for Deployment

### 1. Backend Configuration (`server/index.ts`)
- ✅ Added CORS support for cross-origin requests
- ✅ Configured environment variable support for `FRONTEND_URL`
- ✅ Added proper CORS headers for Render deployment

### 2. Frontend Configuration
- ✅ Created `client/package.json` with all necessary dependencies
- ✅ Created `client/vite.config.ts` for Vite configuration
- ✅ Created `client/tsconfig.json` and `client/tsconfig.node.json`
- ✅ Created `client/src/lib/config.ts` for API URL configuration
- ✅ Updated `client/src/lib/queryClient.ts` to use environment variables

### 3. Build Configuration
- ✅ Updated root `package.json` with new build scripts:
  - `build:client`: Builds the client application
  - `build:server`: Builds the server application
  - `start:dev`: Development server start command

### 4. Render Configuration
- ✅ Created `render.yaml` for infrastructure as code deployment
- ✅ Configured both backend and frontend services
- ✅ Set up environment variables for both services

### 5. Documentation
- ✅ Created comprehensive `README.md` with deployment instructions
- ✅ Created `deploy.sh` script for deployment preparation
- ✅ Created this `DEPLOYMENT.md` guide

## Next Steps for Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Deploy to Render

#### Option A: Using Blueprint (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and create both services

#### Option B: Manual Deployment
1. **Backend Service**:
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `findrconnect-backend`
     - Root Directory: `server`
     - Build Command: `npm install && npm run build:server`
     - Start Command: `npm start`
     - Environment: Node
     - Plan: Free

2. **Frontend Service**:
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - Name: `findrconnect-frontend`
     - Root Directory: `client`
     - Build Command: `cd client && npm install && npm run build`
     - Publish Directory: `dist`
     - Plan: Free

### 3. Environment Variables

#### Backend Environment Variables
Set these in your Render backend service:
```bash
NODE_ENV=production
DATABASE_URL=your_postgresql_connection_string
FRONTEND_URL=https://your-frontend-service.onrender.com
```

#### Frontend Environment Variables
Set these in your Render frontend service:
```bash
VITE_API_URL=https://your-backend-service.onrender.com
```

### 4. Post-Deployment Steps

1. **Update URLs**: After deployment, update the environment variables with the actual URLs provided by Render
2. **Test Connection**: Verify that the frontend can communicate with the backend
3. **Database Setup**: Ensure your database is properly configured and accessible
4. **File Uploads**: Test image upload functionality

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure `FRONTEND_URL` is set correctly in backend environment variables
   - Check that the frontend URL is included in the `allowedOrigins` array

2. **Build Failures**:
   - Check that all dependencies are properly listed in `package.json`
   - Ensure TypeScript compilation is successful

3. **API Connection Issues**:
   - Verify `VITE_API_URL` is set correctly in frontend environment variables
   - Check that the backend service is running and accessible

4. **Database Connection**:
   - Ensure `DATABASE_URL` is set correctly
   - Verify database is accessible from Render's servers

### Support

If you encounter issues:
1. Check Render's deployment logs
2. Verify environment variables are set correctly
3. Test locally with the same environment variables
4. Check the Render documentation for common issues

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Render services created (backend and frontend)
- [ ] Environment variables configured
- [ ] Database connection established
- [ ] Frontend can communicate with backend
- [ ] Image uploads working
- [ ] All features tested and working

🎉 **Congratulations! Your FindRConnect application is now deployed on Render!**
