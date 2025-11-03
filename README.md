# DashDash - AI Doctor Dashboard with 3D Brain Segmentation

An advanced medical dashboard combining AI assistance, 3D brain visualization, and medical diagnosis tools.

## Project Structure

- `frontend/` - Next.js web application with Clerk authentication
- `backend/` - Python Flask API server
  - `3d_segmentation_model/` - Browser-based 3D segmentation viewer
- `Ai_Doctor/` - AI-powered medical assistant service using Gradio, Groq, and ElevenLabs

## Prerequisites

- Node.js >= 18
- Python >= 3.12
- Docker and Docker Compose (recommended)
- FFmpeg (for audio processing)

## Quick Start with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/rdxpt/dashdash.git
   cd dashdash
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

3. Start all services:
   ```bash
   npm run dev
   ```

The following services will be available:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- AI Service: http://localhost:7860
- 3D Model Viewer: http://localhost:3001

## Development Without Docker

1. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. Backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   flask run
   ```

3. AI Service:
   ```bash
   cd Ai_Doctor
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   python run_gradio_server.py
   ```

4. 3D Model Viewer:
   ```bash
   cd backend/3d_segmentation_model
   npm install
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start all services with Docker Compose
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:3d-model` - Start only the 3D model viewer
- `npm run dev:ai` - Start only the AI service
- `npm run build` - Build all services
- `npm run test` - Run all tests
- `npm run lint` - Run linting
- `npm run clean` - Clean build artifacts and dependencies

## Environment Variables

The following environment variables need to be set in your `.env` file:

1. Frontend (Next.js):
   - `NEXT_PUBLIC_API_URL` - Backend API URL
   - `NEXT_PUBLIC_AI_SERVICE_URL` - AI Service URL
   - `NEXT_PUBLIC_3D_MODEL_URL` - 3D Model Viewer URL
   - Clerk authentication keys

2. AI Doctor:
   - `GROQ_API_KEY` - Your Groq API key
   - `ELEVENLABS_API_KEY` - Your ElevenLabs API key

See `.env.example` for a complete list of required variables.

## Troubleshooting

- If you encounter port conflicts, check that no other applications are using ports 3000, 3001, 5000, or 7860
- For microphone issues with the AI Doctor, ensure your browser has permission to access the microphone
- If FFmpeg is not installed, follow the installation instructions for your operating system
- Docker issues:
  - Ensure Docker and Docker Compose are installed and running
  - Try `docker-compose down -v` to clean up volumes and restart

## Contributing

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git commit -m "Description of changes"
   ```

3. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request

## License

MIT