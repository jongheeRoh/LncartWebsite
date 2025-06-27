import fs from 'fs';
import path from 'path';

interface ErrorReport {
  timestamp: Date;
  type: 'client' | 'server' | 'api';
  message: string;
  stack?: string;
  url?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class ErrorMonitor {
  private errors: ErrorReport[] = [];
  private maxErrors = 100;
  private logFile = path.join(process.cwd(), 'error-monitor.log');

  constructor() {
    console.log('🔍 Error Monitor started - watching for issues...');
    this.setupProcessHandlers();
    this.startCleanupTimer();
  }

  private setupProcessHandlers() {
    // 서버 에러 감지
    process.on('uncaughtException', (error) => {
      this.reportError({
        timestamp: new Date(),
        type: 'server',
        message: `Uncaught Exception: ${error.message}`,
        stack: error.stack,
        severity: 'critical'
      });
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.reportError({
        timestamp: new Date(),
        type: 'server',
        message: `Unhandled Rejection: ${reason}`,
        stack: reason instanceof Error ? reason.stack : undefined,
        severity: 'high'
      });
    });
  }

  public reportError(error: ErrorReport) {
    this.errors.unshift(error);
    
    // 최대 에러 수 제한
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // 로그 파일에 기록
    this.writeToLog(error);

    // 콘솔에 즉시 알림
    this.alertError(error);
  }

  private writeToLog(error: ErrorReport) {
    const logEntry = `[${error.timestamp.toISOString()}] ${error.severity.toUpperCase()} - ${error.type}: ${error.message}\n`;
    
    fs.appendFile(this.logFile, logEntry, (err) => {
      if (err) console.error('Failed to write to error log:', err);
    });
  }

  private alertError(error: ErrorReport) {
    const severity = error.severity.toUpperCase();
    const emoji = this.getSeverityEmoji(error.severity);
    
    console.log(`\n${emoji} [${severity}] Error Detected:`);
    console.log(`  Type: ${error.type}`);
    console.log(`  Message: ${error.message}`);
    if (error.url) console.log(`  URL: ${error.url}`);
    console.log(`  Time: ${error.timestamp.toLocaleString('ko-KR')}`);
    
    if (error.severity === 'critical') {
      console.log('⚠️  CRITICAL ERROR - Immediate attention required!');
    }
    
    console.log(''); // 빈 줄 추가
  }

  private getSeverityEmoji(severity: string): string {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '❓';
    }
  }

  public getRecentErrors(count: number = 10): ErrorReport[] {
    return this.errors.slice(0, count);
  }

  public getErrorStats() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const recentErrors = this.errors.filter(error => error.timestamp > oneHourAgo);
    
    const stats = {
      total: this.errors.length,
      lastHour: recentErrors.length,
      bySeverity: {
        critical: recentErrors.filter(e => e.severity === 'critical').length,
        high: recentErrors.filter(e => e.severity === 'high').length,
        medium: recentErrors.filter(e => e.severity === 'medium').length,
        low: recentErrors.filter(e => e.severity === 'low').length,
      },
      byType: {
        client: recentErrors.filter(e => e.type === 'client').length,
        server: recentErrors.filter(e => e.type === 'server').length,
        api: recentErrors.filter(e => e.type === 'api').length,
      }
    };

    return stats;
  }

  private startCleanupTimer() {
    // 매 시간마다 오래된 에러 정리
    setInterval(() => {
      const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
      this.errors = this.errors.filter(error => error.timestamp > sixHoursAgo);
      
      if (this.errors.length === 0) {
        console.log('✅ No errors in the last 6 hours - All systems healthy!');
      }
    }, 60 * 60 * 1000); // 1시간마다
  }

  public reportAPIError(endpoint: string, method: string, statusCode: number, message: string) {
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium';
    
    if (statusCode >= 500) severity = 'high';
    if (statusCode === 401 && endpoint.includes('/api/stats')) severity = 'low'; // 관리자 인증 실패는 낮은 심각도
    if (statusCode >= 500 && endpoint.includes('admission')) severity = 'critical';

    this.reportError({
      timestamp: new Date(),
      type: 'api',
      message: `${method} ${endpoint} -> ${statusCode}: ${message}`,
      url: endpoint,
      severity
    });
  }

  public reportClientError(error: string, url?: string) {
    this.reportError({
      timestamp: new Date(),
      type: 'client',
      message: error,
      url,
      severity: 'medium'
    });
  }
}

export const errorMonitor = new ErrorMonitor();