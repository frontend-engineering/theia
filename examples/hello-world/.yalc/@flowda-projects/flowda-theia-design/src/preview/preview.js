import React from 'react';
import { createComponent } from '@lit/react';
import { ReferencePreview } from './reference-preview';
export const Preview = createComponent({
    tagName: 'reference-preview',
    elementClass: ReferencePreview,
    react: React,
    events: {
        onactivate: 'activate',
        onchange: 'change',
    },
});
//# sourceMappingURL=preview.js.map