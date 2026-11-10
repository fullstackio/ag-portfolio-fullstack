import { NextResponse } from 'next/server';

import type { ApiErrorResponse, ApiResponse } from '@/types/api';

export function apiSuccess<T>(data: T, init?: ResponseInit) {
  return NextResponse.json<ApiResponse<T>>({ success: true, data }, init);
}

export function apiError(statusCode: number, message: string, path?: string) {
  return NextResponse.json<ApiErrorResponse>(
    {
      success: false,
      statusCode,
      message,
      path,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode },
  );
}
