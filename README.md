# Trading Admin Console

This is the frontend for the Trading Admin Console application built with Next.js, Material UI, and Redux.

## Getting Started

Follow these steps to run the application:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Test Credentials

Use the following credentials to log in:

- **Email**: `admin@example.com`
- **Password**: `password123`

## Features

- User authentication
- Dashboard overview
- Trade history with filtering by date
- User management
- Risk management
- Reports and analytics
- System notifications
- Settings configuration

## Tech Stack

- Next.js 14
- Material UI 5
- Redux Toolkit
- React Query
- TypeScript
- date-fns
- Formik & Yup
- MUI X-Data-Grid

## Important Notes

- The application is set up with mock data for testing purposes
- API calls are simulated with timeouts
- For production, replace mock data with actual API endpoints

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   └── (dashboard)/       # Dashboard pages
├── components/            # Reusable components
├── hooks/                 # Custom hooks
├── lib/                   # Utility functions
├── store/                 # Redux store
└── types/                 # TypeScript types
```

## Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 