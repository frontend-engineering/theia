import { z } from 'zod';
import { agSortSchema } from '@flowda/types';

declare function shortenDatetime(text: string): string;

declare function convertSortAgToMotor(sort: z.infer<typeof agSortSchema>): string | undefined;

export { convertSortAgToMotor, shortenDatetime };
