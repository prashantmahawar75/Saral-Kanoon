# Saral Kanoon (सरल कानून)

A sophisticated AI-powered legal document analysis platform that helps users identify potential risks and issues in legal contracts and documents. "Saral Kanoon" means "Simple Law" in Hindi, reflecting our mission to make legal document analysis accessible and understandable for everyone.

## Features

- **Document Upload & Processing**: Support for PDF, DOCX, and other document formats
- **AI-Powered Analysis**: Advanced natural language processing to identify legal risks
- **Risk Assessment**: Color-coded risk levels (Low, Medium, High) for easy identification
- **Interactive Dashboard**: Clean, professional interface for document review
- **Multi-format Export**: Download annotated documents with risk assessments
- **Real-time Processing**: Fast document analysis with progress tracking

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Framer Motion** for smooth animations
- **React Hook Form** for form management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Drizzle ORM** with PostgreSQL
- **Passport.js** for authentication
- **Multer** for file uploads
- **OpenAI/Google AI** for document analysis

### Database
- **PostgreSQL** with Drizzle ORM
- **Neon Database** for cloud hosting

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database
- OpenAI API key or Google AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/prashantmahawar75/Saral-Kanoon.git
cd Saral-Kanoon
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```env
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
SESSION_SECRET=your_session_secret
PORT=5000
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema changes

## Project Structure

```
Saral-Kanoon/
├── client/          # React frontend application
├── server/          # Express backend API
├── shared/          # Shared types and utilities
├── uploads/         # File upload directory
├── package.json     # Dependencies and scripts
├── vite.config.ts   # Vite configuration
├── drizzle.config.ts # Database configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## API Endpoints

- `POST /api/upload` - Upload and analyze documents
- `GET /api/documents` - Get user documents
- `GET /api/analysis/:id` - Get document analysis results
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.