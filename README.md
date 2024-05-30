# Forum timeline App

The Forum Timeline App is a web application built with React, TypeScript, and various libraries and hooks. The primary purpose of this project is to showcase the following best practices:

1. Good code organization
2. Code cleanliness
3. Problem-solving skills
4. Proper API integration
5. Clean and user-friendly UI

## overview 

This frontend normally focused on the general problem that faced by microservice architecture, which is the data consistency. 

So i've used some of the following patterns to solve this problem:

## Features

- **Data Aggregation and Caching**: By using Tanstack React Query, this frontend application can efficiently fetch and cache data from multiple microservices, reducing the load on the backend services and potentially improving overall performance.
- **Infinite Scrolling**: The application implements infinite scrolling functionality, allowing users to load more posts as they scroll down the page.
- **API Composition**: This application demonstrates how to combine data from multiple microservices (posts and users) and present it in a unified and coherent way to the user
- **Lazy Loading and Code Splitting**: Implement lazy loading and code splitting techniques to load UI components and data only when needed, reducing the initial load time and improving performance
- **Custom Hooks**: The project utilizes custom hooks for better code organization and reusability, such as `useFetchPosts`, `useFetchComments`, `useFetchUsers`, and `useInfiniteScroll`.
- **Clean UI**: The application features a clean and responsive user interface, with appropriate loading and error states.

## Technologies Used

- **React**: The project is built using React, a popular JavaScript library for building user interfaces.
- **TypeScript**: TypeScript is used to add static typing to the codebase, improving code quality and maintainability.
- **Tanstack React Query**: This library is used for efficient data fetching and caching, providing a better developer experience and improved performance.
- **Tailwind CSS**: The project utilizes Tailwind CSS for styling the components, ensuring a consistent and responsive design.
- **Axios**: Axios is used as the HTTP client for making API requests to the JSONPlaceholder API.
- **Vite**: Vite is used as the build tool and development server, providing a fast and modern development experience.

## Installation and Setup

1. Clone the repository: `git clone https://github.com/yourusername/react-infinite-scroll-posts.git`
2. Navigate to the project directory: `cd react-infinite-scroll-posts`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and visit `http://localhost:5173` to see the application.

## Usage

Upon opening the application, you will see a timeline of posts fetched from the JSONPlaceholder API. As you scroll down, more posts will be loaded automatically (infinite scrolling).

You can expand each post to view its associated comments. The comments are fetched from the API and displayed below the post content.

The username of the post author is also displayed alongside each post, fetched from the user data provided by the API.

## Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).