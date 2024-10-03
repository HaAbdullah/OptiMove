const A="data:image/png;base64,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";export{A as default};
