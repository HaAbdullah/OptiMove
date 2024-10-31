const U="data:image/png;base64,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";export{U as default};