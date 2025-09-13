# React Lead Management Dashboard

A modern, responsive, and feature-rich lead management application built from the ground up with React, Tailwind CSS, and modern development best practices. This project serves as a powerful boilerplate for data-driven dashboard applications.

---

## ✨ Features

- **Modern & Responsive UI**: A clean, card-based design that looks great on all devices, from mobile phones to widescreen desktops.
- **Dynamic Data Table**: Display, sort, and paginate through leads with a smooth user experience.
- **Real-time Search & Filtering**: Instantly search for leads by name/company and filter by their current status.
- **Responsive Detail View**:
  - On **desktop**, a sticky side panel appears, keeping lead details visible while you scroll.
  - On **mobile**, an accessible modal overlay provides a focused view for editing and actions.
- **Edit Lead Information**: Seamlessly update lead details like email and status in the detail panel.
- **Convert Leads to Opportunities**: A complete workflow to convert a qualified lead into an opportunity, moving it to a separate "Opportunities" view.
- **Comprehensive Loading States**: Skeleton loaders and spinners provide clear feedback during data fetching, filtering, and asynchronous actions.
- **Non-blocking Toast Notifications**: User-friendly toasts (powered by Sonner) provide feedback for actions like saving or converting a lead, without interrupting the user's workflow.

## 🛠️ Tech Stack

This project is built with a modern, efficient, and scalable technology stack:

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Built from scratch using Radix UI primitives and [Headless UI](https://headlessui.com/) for accessible modals.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Language**: JavaScript (easily convertible to TypeScript)

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your machine.
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- `npm` or `yarn`

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
    ```
2.  **Navigate to the project directory**
    ```sh
    cd your-repository-name
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can run the local development server:

```sh
npm run dev
```
Open http://localhost:5173 (or the port specified in your terminal) to view it in the browser. The app will automatically reload if you make changes to the code.

📁 Folder Structure
The project follows a modular and scalable folder structure to keep the code organized and maintainable.

```sh
/src
|-- /assets
|-- /components         # Reusable UI components (Tables, Panels, Modals, etc.)
|   |-- /common         # Generic components like Modals, Spinners
|-- /hooks              # Custom React hooks for stateful logic (useLeads, usePagination)
|-- /data               # Local mock data (leads-data.json)
|-- /utils              # Helper functions and constants
|-- App.jsx             # Main application component and layout orchestrator
|-- main.jsx            # Application entry point
|-- index.css           # Global styles and Tailwind CSS directives
```

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.
