import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginProps {
  onLoginSuccess: (sessionId: string) => void;
}

export default function AdminLogin({ onLoginSuccess }: LoginProps) {
  const { toast } = useToast();
  
  const form = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      console.log("Login attempt:", data);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      console.log("Login response status:", response.status);
      
      if (!response.ok) {
        const error = await response.json();
        console.error("Login error:", error);
        throw new Error(error.error || "Login failed");
      }
      
      const result = await response.json();
      console.log("Login success:", result);
      return result;
    },
    onSuccess: (data) => {
      console.log("Login mutation success:", data);
      toast({
        title: "로그인 성공",
        description: "관리자 페이지에 접속했습니다.",
      });
      onLoginSuccess(data.sessionId);
    },
    onError: (error: Error) => {
      console.error("Login mutation error:", error);
      toast({
        title: "로그인 실패",
        description: error.message || "아이디나 비밀번호를 확인해주세요.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="선과색 미술학원 간판" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">관리자 로그인</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              선과색미술학원 관리자 페이지 접속
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-md mx-auto px-4 py-16">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Lock className="h-6 w-6" />
              관리자 로그인
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>사용자명</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="관리자 아이디를 입력하세요"
                            className="pl-10"
                            disabled={loginMutation.isPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            className="pl-10"
                            disabled={loginMutation.isPending}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "로그인 중..." : "로그인"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>관리자 로그인 정보:</strong><br />
                아이디: <code className="bg-blue-100 px-1 rounded">admin</code><br />
                비밀번호: <code className="bg-blue-100 px-1 rounded">line2024!</code>
              </p>
              <p className="text-xs text-blue-600 mt-2">
                위 정보를 정확히 입력해주세요. 대소문자를 구분합니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}