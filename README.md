#  Full-Stack E-Commerce Website
This is a full-stack e-commerce website built using **Next.js**, **TypeScript**, and **React**. It’s designed for gym enthusiasts, with a variety of training gear and apparel. While the website is still under construction, it currently includes basic functionalities for product browsing, user authentication, and image optimization.
## Technologies Used
- **Next.js**: A React framework for building fast and scalable web applications. Used for both front-end and API routes.
- **TypeScript**: A statically typed superset of JavaScript that improves code quality and developer experience.
- **React**: For building the user interface and dynamic components.
- **MongoDB**: Used as a NoSQL database for storing user and product data.
- **Cloudinary**: Used for image optimization and handling image uploads.
- **NextAuth.js**: For implementing authentication with JWT tokens.
- **LocalStorage**: For managing guest users when not logged in.
## Features
- **Product Display**: View a wide range of gym-related products with images stored on Cloudinary.
- **User Authentication**: Users can log in and sign up using **NextAuth.js**, and JWT tokens are used for managing sessions.
- **Local Storage Support**: For guest users, product data is stored in localStorage, so they can still browse without logging in.
- **Image Optimization**: Cloudinary handles all images to ensure quick loading times and high-quality images.
## Getting Started
To get the project up and running locally, follow these steps:
### 1. Clone the repository
```bash
git clone https://github.com/your-username/e-commerce.git
```
### 2. Install dependencies
Make sure you have Node.js installed, then run:
```bash
cd e-commerce
npm install
```
### 3. Set up environment variables
In the root directory of the project, create a .env file and add the following environment variables:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your-api-secret
JWT_SECRET=your-jwt-secret
MONGODB_URI=your-mongodb-uri
```
### 4. Run the app
Once everything is set up, you can run the development server with:
```bash
npm run dev
Then, open your browser and go to http://localhost:3000 to see the app in action!
```
### Roadmap
The project is under construction, so here’s what’s on the way:
- **Finalizing the user checkout flow and integrating payment processing.**
- **Completing the admin dashboard for product and user management.**
- **Improving the user interface and mobile responsiveness.**
- **Completing the accessories page**
  
### License
This project is open-source and available under the MIT License.
