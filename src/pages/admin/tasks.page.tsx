import FormTask from "@/components/tasks/form-task";
import ListTask from "@/components/tasks/list-task";
import { Card } from "@/components/ui/card";
import { CheckSquare, Plus } from "lucide-react";
import { Suspense, useState } from "react";

const TasksPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Tareas</h1>
            <p className="text-slate-600">
              Gestiona tus tareas y mantente organizado
            </p>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      <Card className="p-6 border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Nueva Tarea</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {showForm ? "Ocultar" : "Agregar tarea"}
          </button>
        </div>
        {showForm && (
          <div className="border-t border-slate-100 pt-4">
            <FormTask />
          </div>
        )}
      </Card>

      {/* Tasks List */}
      <Card className="border border-slate-200 bg-white shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Mis Tareas</h2>
        </div>
        <div className="p-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-8 text-slate-500">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span className="ml-2">Cargando tareas...</span>
              </div>
            }
          >
            <ListTask />
          </Suspense>
        </div>
      </Card>
    </div>
  );
};
export default TasksPage;
