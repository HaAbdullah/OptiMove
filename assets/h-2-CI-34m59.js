const B="data:image/png;base64,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";export{B as default};