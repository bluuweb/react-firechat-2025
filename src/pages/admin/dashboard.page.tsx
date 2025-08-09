import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthActions } from "@/hooks/use-auth-actions";
import {
  Activity,
  Calendar,
  CheckSquare,
  MessageCircle,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useUser } from "reactfire";

const DashboardPage = () => {
  const { data: user } = useUser();
  const { logout } = useAuthActions();

  const stats = [
    {
      title: "Mensajes",
      value: "1,234",
      icon: MessageCircle,
      change: "+12%",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Tareas",
      value: "23",
      icon: CheckSquare,
      change: "+5%",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Contactos",
      value: "156",
      icon: Users,
      change: "+8%",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Actividad",
      value: "98%",
      icon: Activity,
      change: "+2%",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            ¡Hola, {user?.displayName || "Usuario"}! 👋
          </h1>
          <p className="text-slate-600 mt-1">
            Aquí está tu resumen de actividad de hoy
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm font-medium">
                {stat.change}
              </span>
              <span className="text-slate-500 text-sm ml-1">vs mes pasado</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <Card className="lg:col-span-2 p-6 border border-slate-200 bg-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Perfil de Usuario
              </h2>
              <div className="space-y-2 text-slate-600">
                <p>
                  <span className="font-medium">Nombre:</span>{" "}
                  {user?.displayName || "No especificado"}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {user?.email || "No especificado"}
                </p>
                <p>
                  <span className="font-medium">Estado:</span>{" "}
                  <span className="text-green-500">● Activo</span>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 border border-slate-200 bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Acciones Rápidas
          </h3>
          <div className="space-y-3">
            <Button
              className="w-full justify-start bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => (window.location.href = "/admin/chat")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Abrir Chat
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-200 hover:bg-slate-50"
              onClick={() => (window.location.href = "/admin/tasks")}
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Ver Tareas
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-200 hover:bg-slate-50"
              onClick={() => (window.location.href = "/admin/profile")}
            >
              <User className="w-4 h-4 mr-2" />
              Editar Perfil
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start"
              onClick={logout}
            >
              <Activity className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default DashboardPage;
