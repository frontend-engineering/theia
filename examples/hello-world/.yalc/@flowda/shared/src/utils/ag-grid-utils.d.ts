import { z } from 'zod';
import { agSortSchema } from '@flowda/types';
export declare function convertSortAgToMotor(sort: z.infer<typeof agSortSchema>): string | undefined;
