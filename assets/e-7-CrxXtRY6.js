const A="data:image/png;base64,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";export{A as default};