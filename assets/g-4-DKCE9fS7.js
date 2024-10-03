const R="data:image/png;base64,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";export{R as default};
