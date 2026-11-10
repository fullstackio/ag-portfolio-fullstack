import mongoose from 'mongoose';

import { apiError, apiSuccess } from '@/lib/api-response';
import { getDb } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    await getDb();
    const mongoState = mongoose.connection.readyState; // 1 = connected

    const heapUsedMb = process.memoryUsage().heapUsed / (1024 * 1024);
    const memoryOk = heapUsedMb < 300;

    const checks = {
      mongodb: mongoState === 1 ? 'up' : 'down',
      memory_heap: memoryOk ? 'up' : 'down',
    };

    const allOk = checks.mongodb === 'up' && checks.memory_heap === 'up';

    if (!allOk) {
      return apiError(503, 'Health check failed', new URL(request.url).pathname);
    }

    return apiSuccess({ status: 'ok', checks });
  } catch (error) {
    return apiError(
      503,
      error instanceof Error ? error.message : 'Health check failed',
      new URL(request.url).pathname,
    );
  }
}
