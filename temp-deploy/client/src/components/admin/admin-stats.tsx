import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Megaphone, Images, Users, TrendingUp } from "lucide-react";

interface StatsData {
  totalNotices: number;
  totalImages: number;
  monthlyVisitors: number;
  viewsGrowth: string;
}

export default function AdminStats() {
  const { data: stats, isLoading } = useQuery<StatsData>({
    queryKey: ["/api/stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="ml-4 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statItems = [
    {
      icon: Megaphone,
      label: "총 공지사항",
      value: stats?.totalNotices || 0,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Images,
      label: "갤러리 이미지",
      value: stats?.totalImages || 0,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Users,
      label: "월별 방문자",
      value: stats?.monthlyVisitors?.toLocaleString() || "0",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: TrendingUp,
      label: "조회수 증가",
      value: stats?.viewsGrowth || "+0%",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statItems.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
