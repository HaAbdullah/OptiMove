const A="data:image/png;base64,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";export{A as default};
