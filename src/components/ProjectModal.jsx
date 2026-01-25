const ProjectModal = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold dark:text-white">{project.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl">
              &times;
            </button>
          </div>
          
          {/* Project Image Display */}
          <div className="rounded-xl overflow-hidden mb-6 bg-gray-200 dark:bg-gray-700">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold dark:text-white">Texnologiyalar:</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded-full text-xs">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};