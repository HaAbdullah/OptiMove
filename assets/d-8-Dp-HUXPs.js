const n="data:image/png;base64,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";export{n as default};