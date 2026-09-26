# ImpactX - Elevating Social Impact Measurement and Matching

ImpactX is a cutting-edge web application designed to bridge the gap between social initiatives and the resources they need to thrive. By leveraging AI-powered impact scoring and intelligent matching, ImpactX empowers nonprofits, NGOs, and social enterprises to demonstrate their value, attract funding, and maximize their positive influence on the world.

## 🚀 Key Features

### 💡 Smart Impact Assessment
- **AI-Powered Scoring**: Utilizes advanced AI to analyze project descriptions, goals, and metrics to generate accurate impact scores.
- **Dynamic Goal Tracking**: Continuously monitors project progress and updates impact scores based on real-time data and achievements.
- **Visual Reporting**: Provides intuitive charts and dashboards to visualize impact over time, making it easier to communicate value to stakeholders.

### 🎯 Intelligent Matching Engine
- **Needs-Based Matching**: Matches projects with relevant funders, investors, and organizations based on shared goals and impact areas.
- **Resource Optimization**: Suggests the most suitable funding sources and opportunities to maximize project impact and sustainability.
- **Cross-Border Opportunities**: Enables international collaboration by connecting projects with global funding networks.

### 🌐 Community & Collaboration
- **Team Project Management**: Allows multiple users to collaborate on projects, share updates, and track progress together.
- **Social Showcases**: Features a "showcase" feed where projects can highlight their achievements and inspire others.
- **Interactive Feedback**: Enables community members to provide feedback and support to projects they care about.

### 📊 Comprehensive Analytics
- **Funding Trends**: Tracks funding patterns and identifies emerging opportunities in the social impact space.
- **Impact Benchmarking**: Compares project impact against industry standards and best practices.
- **Resource Allocation Insights**: Provides data-driven recommendations for optimizing resource allocation.

## 🛠️ Built With

- **Frontend**: Next.js (React Framework)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend & Database**: Firebase (Authentication, Firestore, Storage)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Firebase Account](https://firebase.google.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mousa-ai/impactX_Initial_Submitted_version.git
   cd impactX_Initial_Submitted_version
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
   - Add a web app to your Firebase project
   - Enable **Email/Password** authentication
   - Get your Firebase configuration:
     ```json
     {
       "apiKey": "your-api-key",
       "authDomain": "your-auth-domain",
       "projectId": "your-project-id",
       "storageBucket": "your-storage-bucket",
       "messagingSenderId": "your-messaging-sender-id",
       "appId": "your-app-id"
     }
     ```
   - Create a `.env.local` file in the root directory with your Firebase configuration:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     GEMINI_API_KEY=your-gemini-api-key
     ```
   - **Note**: Replace `your-gemini-api-key` with your actual Gemini API key if you have one. If not, you can still run the app locally without it (some AI features may be limited).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production

To create a production build:

```bash
npm run build
npm run start
```

## 🗺️ Project Structure

```
impactX/
├── app/                      # Next.js app directory
│   ├── (auth)/               # Authentication flows
│   │   ├── login/            # Login page
│   │   └── register/         # Registration page
│   ├── (tabs)/               # Main tab navigation
│   │   ├── explore/          # Project exploration
│   │   ├── showcase/         # Community showcase
│   │   ├── funding/          # Funding opportunities
│   │   ├── profile/          # User profile
│   │   ├── matches/          # Matched opportunities
│   │   └── settings/         # App settings
│   ├── components/           # Reusable UI components
│   │   ├── project-card/     # Project cards
│   │   └── ui/               # General UI elements
│   ├── lib/                  # Utility functions
│   │   └── firebase.ts       # Firebase configuration
│   ├── services/             # API services
│   ├── hooks/                # Custom React hooks
│   └── api/                  # API routes
├── public/                   # Static assets
├── styles/                   # Global styles
└── .env.local               # Environment variables
```

## 🔄 Development

### Adding New Features

To add a new feature:

1. **Create a new feature branch**
   ```bash
   git checkout -b feat/new-feature
   ```

2. **Implement the feature**
   - Add new pages or components in the `app/` directory
   - Update relevant services or hooks in `lib/` or `services/`
   - Add any necessary backend logic in `api/`

3. **Test your changes**
   - Run `npm run dev` to test locally
   - Verify that all features work as expected
   - Ensure responsive design across devices

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add new feature description"
   ```

5. **Push to GitHub**
   ```bash
   git push origin feat/new-feature
   ```

### Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feat/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feat/AmazingFeature`)
5. **Open a Pull Request**

Please ensure your code follows our coding standards and includes appropriate tests.

## 🔐 Security & Privacy

- **Firebase Security Rules**: Ensure your Firestore and Storage security rules are properly configured to protect user data.
- **Environment Variables**: Never commit `.env` files to version control. Use `.env.local` for local development only.
- **API Keys**: Keep your Gemini API key secure and do not expose it in client-side code.

## 🤝 Code of Conduct

We're building a community dedicated to positive social impact. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the values and guidelines that help us create an inclusive and respectful environment.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## 📧 Support

For questions, issues, or feature requests:

- **Report bugs**: [GitHub Issues](https://github.com/mousa-ai/impactX_Initial_Submitted_version/issues)
- **Suggest features**: [GitHub Issues](https://github.com/mousa-ai/impactX_Initial_Submitted_version/issues)
- **Contact**: Reach out via GitHub or relevant channels for the hackathon.

## 🙏 Acknowledgments

- **Firebase** - Powerful backend-as-a-service platform
- **Next.js** - React framework
