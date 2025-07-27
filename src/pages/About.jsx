const About = () => {
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold mb-4">
        <span className="bg-slate-200 rounded-xl px-2">About this app</span>
      </h1>

      <p className="mb-4">
        This is a full-featured Todo application built with{" "}
        <strong>React</strong>,<strong> Firebase Authentication</strong>, and{" "}
        <strong>Cloud Firestore</strong>. It allows users to manage their daily
        tasks and subtasks with a clean, responsive UI.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-slate-800">
        🌟 <span className="bg-slate-200 rounded-xl px-2">Key Features</span>
      </h2>
      <ul className="list-disc list-inside space-y-1 mb-6 ml-10">
        <li>Sign Up / Sign In with Email or Google</li>
        <li>Add, edit, delete todos and subtasks</li>
        <li>Mark tasks/subtasks as completed</li>
        <li>Real-time sync using Firestore `onSnapshot`</li>
        <li>Filter by completed / incomplete tasks</li>
        <li>Search todos by title</li>
        <li>Responsive layout with mobile-first design</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2 text-slate-800">
        🛠 <span className="bg-slate-200 rounded-xl px-2">Tech Stack</span>
      </h2>
      <ul className="list-disc list-inside space-y-1 mb-6 ml-10">
        <li>React (Vite)</li>
        <li>Tailwind CSS</li>
        <li>Firebase Authentication</li>
        <li>Firestore (for real-time database)</li>
        <li>React Context API (global state management)</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2 text-slate-800">
        👨‍💻<span className="bg-slate-200 rounded-xl px-2">Author</span>
      </h2>
      <p className="ml-10">
        Built with ❤️ by Rahul Saini. View the source code on{" "}
        <a
          href="https://github.com/rs1705/to-do"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
};

export default About;
