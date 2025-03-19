
# Khulna University Portal - Admin Panel

This is the **Admin Panel** for the **Khulna University Portal** built using **Next.js**, **React**, and **Material-UI**. This project provides an interface for administrators to manage users, news, support requests, careers, NOC/GO documents, and more.

## Live Demo

You can access the live demo of the **Admin Panel** here:  
[**Khulna University Admin Panel**](https://ku-admin.vercel.app/)

![Admin Panel Preview](https://i.ibb.co.com/DH3JCtPY/image.png)  
*Admin Panel Screenshot*

## Features

- **User Management**: Admins can view, edit, and delete user accounts.
- **News Management**: Admins can create, update, and delete news articles.
- **Support Requests**: Admins can manage user support requests (view and update status).
- **Career Management**: Admins can manage career/job listings.
- **NOC/GO Document Management**: Admins can upload and manage NOC/GO documents.
- **Real-time Analytics**: Includes charts and visual data using **ApexCharts** and **Chart.js**.

## Technologies Used

- **Next.js** ⚛️: A React framework used for server-side rendering and static site generation.
- **React** ⚙️: JavaScript library for building user interfaces.
- **TypeScript** 🔤: A superset of JavaScript that adds static types.
- **Material-UI** 🎨: A popular React component library for building UI.
- **Redux Toolkit** 🛠️: For state management across the application.
- **ApexCharts** 📊 & **Chart.js** 📈: For interactive data visualization and charts.
- **Axios** 🔗: For making HTTP requests to the backend.
- **Zod** ✅: For schema validation and type safety.
- **React Hook Form** 📝: For handling form inputs and validation efficiently.
- **Tailwind CSS** 🌈: Utility-first CSS framework for designing the UI.

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/hrshihab/KU-PROJECT-CLIENT.git
cd KU-PROJECT-CLIENT
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```env
NEXT_PUBLIC_API_URL="http://your-backend-url"

```

### 4. Run Development Server

To start the development server:

```bash
npm run dev
```

The application will run on `http://localhost:3000`.

### 5. Build for Production

To build the application for production:

```bash
npm run build
```

### 6. Start in Production Mode

To start the application in production mode:

```bash
npm start
```

## Available Scripts

- **dev**: `next dev` - Start the Next.js development server.
- **build**: `next build` - Build the application for production.
- **start**: `next start` - Start the Next.js production server.
- **lint**: `next lint` - Run ESLint to lint the project files.

## API Endpoints

This admin panel interacts with the backend API for managing users, news, support requests, careers, and NOC/GO documents. For more details, refer to the **API Documentation** in the backend repository or Postman documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

