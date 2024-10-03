const A="data:image/png;base64,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";export{A as default};
